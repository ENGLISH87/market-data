import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChartComponent } from '../../../../core/components/chart/chart.component';
import { NewsComponent } from '../../../../core/components/news/news.component';
import { ShortNumberPipe } from '../../../../core/pipes/short-number.pipe';
import { StandardTemplateComponent } from '../../../../core/templates/standard-template/standard-template.component';
import {
  getTickerSnapshot,
  getTickerSummary,
  setCurrentTicker,
  subscribeToPriceEvents,
  unsubscribePriceEvents,
} from '../../../../state/market-data/market-data.actions';
import { selectCurrentTickerData } from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';
import { PriceSummaryComponent } from '../price-summary/price-summary.component';
import { StockSummaryComponent } from '../stock-summary/stock-summary.component';

@Component({
  selector: 'md-stock',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ShortNumberPipe,
    StandardTemplateComponent,
    MatTabsModule,
    MatIconModule,
    ChartComponent,
    NewsComponent,
    StockSummaryComponent,
    PriceSummaryComponent,
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent implements OnInit, OnDestroy {
  ticker: string | undefined;
  data$: Observable<TickerData | undefined>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
  ) {
    this.data$ = this.store.select(selectCurrentTickerData);
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params: Params) => {
      this.ticker = params['ticker'];

      // TODO: simplify to single dispatch to resolve linting warning
      // @ngrx/avoid-dispatching-multiple-actions-sequentially
      [
        setCurrentTicker({ t: this.ticker! }),
        subscribeToPriceEvents([this.ticker!]),
        getTickerSnapshot({ t: this.ticker! }),
        getTickerSummary({ t: this.ticker! }),
      ].forEach((a) => this.store.dispatch(a));
    });
  }

  ngOnDestroy(): void {
    if (this.ticker) {
      this.store.dispatch(unsubscribePriceEvents([this.ticker]));
    }
  }
}
