import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UniversalSnapshotInfo } from '@polygon.io/client-js';
import { CandlestickData, createChart, IChartApi } from 'lightweight-charts';
import moment from 'moment';
import { Timespan } from '../../models/agg.model';
import { MarketDataRestService } from '../../services/data-rest.service';
import { miniChartConfig } from './mini-chart.config';

@Component({
  selector: 'md-mini-chart',
  standalone: true,
  template: '<div class="h-full w-full" #chart></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniChartComponent {
  @Input({ required: true }) set snapshot(ss: UniversalSnapshotInfo | undefined) {
    if (ss) {
      this.marketRestSvc
        .aggregates(ss.ticker!, 1, Timespan.hour, this.startOfDay)
        .subscribe((data) => this.setupChart(data, ss));
    }
  }
  @ViewChild('chart', { static: false }) chartContainer!: ElementRef<HTMLDivElement>;

  chart: IChartApi | undefined;
  startOfDay: number = moment().startOf('day').valueOf();

  constructor(private marketRestSvc: MarketDataRestService) {}

  private setupChart(data: CandlestickData[], ss: UniversalSnapshotInfo) {
    this.chart?.remove();
    this.chart = undefined;
    this.chart = createChart(this.chartContainer.nativeElement, {
      ...miniChartConfig,
      height: this.chartContainer.nativeElement.offsetHeight,
    });

    const green = 'rgba(76, 175, 80, 0.56)';
    const greenFade = 'rgba(76, 175, 80, 0.04)';
    const greenLine = 'rgba(76, 175, 80, 1)';
    const red = 'rgba(221, 40, 76, 0.56)';
    const redFade = 'rgba(221, 40, 76, 0.04)';
    const redLine = 'rgba(221, 40, 76, 1)';
    const positive = ss.session?.change && ss.session.change > 0;

    const line = this.chart.addAreaSeries({
      topColor: positive ? green : red,
      bottomColor: positive ? greenFade : redFade,
      lineColor: positive ? greenLine : redLine,
      lineWidth: 2,
    });
    line.setData(data.map((d) => ({ time: d.time, value: d.open })));
  }
}
