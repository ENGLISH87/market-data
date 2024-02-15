import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IAggregateStockEvent } from '@polygon.io/client-js';
import {
  CandlestickData,
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  UTCTimestamp,
} from 'lightweight-charts';
import moment from 'moment';
import { BehaviorSubject, combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { MarketDataRestService } from '../../services/data-rest.service';
import { MarketDataWsService } from '../../services/data-ws.service';
import { Timespan } from './../../models/agg.model';
import { chartConfig } from './chart.config';

@Component({
  selector: 'md-chart',
  standalone: true,
  imports: [AsyncPipe, NgIf, MatButtonToggleModule, MatProgressSpinnerModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
  @Input() set ticker(tick: string | undefined) {
    if (tick) {
      this.aggregates$ = combineLatest([of(tick), this.range$]).pipe(
        switchMap(([t, r]) => this.marketRestSvc.aggregates(t, 1, r)),
        tap((data) => {
          this.setupChart(data);
        }),
      );

      // this.realtime$ = this.marketWsSvc.events(tick).pipe(tap((e) => this.updateCandle(e)));
    }
  }

  @ViewChild('chart', { static: false }) chartContainer!: ElementRef<HTMLDivElement>;

  range$ = new BehaviorSubject<Timespan>(Timespan.hour);
  aggregates$: Observable<CandlestickData<Time>[]> | undefined;
  realtime$: Observable<IAggregateStockEvent> | undefined;
  chart: IChartApi | undefined;
  candlestickSeries: ISeriesApi<'Candlestick', Time, CandlestickData<Time>> | undefined;
  currentBar: CandlestickData<Time> | undefined;

  constructor(
    private marketWsSvc: MarketDataWsService,
    private marketRestSvc: MarketDataRestService,
  ) {}

  private setupChart(data: CandlestickData[]) {
    // remove any existing chart
    this.chart?.remove();
    this.candlestickSeries = undefined;
    this.chart = undefined;

    // create new chart
    this.chart = createChart(this.chartContainer.nativeElement, {
      ...chartConfig,
      height: this.chartContainer.nativeElement.offsetHeight,
    });
    this.candlestickSeries = this.chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    }) as ISeriesApi<'Candlestick', Time, CandlestickData<Time>>;
    this.currentBar = data[data.length - 1];
    this.candlestickSeries.setData(data);
  }

  private updateCandle(evt: IAggregateStockEvent) {
    const mstp = this.currentBar?.time ? (this.currentBar.time as number) * 1000 : 0; // convert seconds to milliseconds timestamp
    const oldTime = moment.utc(mstp);
    const newTime = moment.utc(evt.e);
    const isSame = oldTime.isSame(newTime, this.range$.value);

    // if evt time within timespan of last bar, then update the bar
    if (isSame && this.currentBar && this.currentBar.open) {
      this.currentBar.low = evt.l < this.currentBar.low ? evt.l : this.currentBar.low;
      this.currentBar.high = evt.h > this.currentBar.high ? evt.h : this.currentBar.high;
      this.currentBar.close = evt.c;
    }
    // else create new bar
    else {
      this.currentBar = {
        open: evt.o || 0,
        close: evt.c || 0,
        low: evt.l || 0,
        high: evt.h || 0,
        time: (newTime.valueOf() / 1000) as UTCTimestamp, // convert to seconds (to match dataset timestamps)
      };
    }

    this.candlestickSeries?.update(this.currentBar);
  }
}
