import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StandardTemplateComponent } from '../../../../core/templates/standard-template/standard-template.component';
import {
  getTickerSnapshot,
  getTickerSummary,
  setCurrentTicker,
} from '../../../../state/market-data/market-data.actions';
import { selectCurrentTickerData } from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';

@Component({
  selector: 'md-stock',
  standalone: true,
  imports: [RouterModule, StandardTemplateComponent, MatIconModule, AsyncPipe, DecimalPipe],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent {
  ticker: string | undefined;
  data$: Observable<TickerData | undefined>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.data$ = this.store.select(selectCurrentTickerData);

    this.route.params.pipe(takeUntilDestroyed()).subscribe((params: Params) => {
      this.ticker = params['ticker'];
      this.store.dispatch(setCurrentTicker({ t: this.ticker! }));
      this.store.dispatch(getTickerSnapshot({ t: this.ticker! }));
      this.store.dispatch(getTickerSummary({ t: this.ticker! }));
    });
  }
}
