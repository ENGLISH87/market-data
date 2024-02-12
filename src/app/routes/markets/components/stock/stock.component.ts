import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setSelectedTicker } from '../../../../state/actions/market-data.actions';
import { TickerData } from '../../../../state/reducers/market-data.reducer';
import { selectCurrentTickerData } from '../../../../state/selectors/market-data.selectors';

@Component({
  selector: 'md-stock',
  standalone: true,
  imports: [MatIconModule, AsyncPipe, RouterModule],
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
    this.route.params
      .pipe(takeUntilDestroyed())
      .subscribe((params: Params) => (this.ticker = params['ticker']));

    this.data$ = this.store.select(selectCurrentTickerData);
    this.store.dispatch(setSelectedTicker({ t: this.ticker! }));
  }
}
