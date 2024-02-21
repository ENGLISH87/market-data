import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
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
export class StockComponent implements OnDestroy {
  ticker: string | undefined;
  data$: Observable<TickerData | undefined>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.data$ = this.store.select(selectCurrentTickerData);

    this.route.params.pipe(takeUntilDestroyed()).subscribe((params: Params) => {
      this.ticker = params['ticker'];

      // TODO: simplify to single dispatch
      // load 52w data for o,c,h,l - https://polygon.io/quote/api/polygon/v2/aggs/ticker/{ticker}/range/53/week/{1yr ago}/{today}?sort=desc&limit=50000
      /* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
      this.store.dispatch(setCurrentTicker({ t: this.ticker! }));
      this.store.dispatch(subscribeToPriceEvents([this.ticker!]));
      this.store.dispatch(getTickerSnapshot({ t: this.ticker! }));
      this.store.dispatch(getTickerSummary({ t: this.ticker! }));
    });
  }

  ngOnDestroy(): void {
    if (this.ticker) {
      this.store.dispatch(unsubscribePriceEvents([this.ticker]));
    }
  }
}
