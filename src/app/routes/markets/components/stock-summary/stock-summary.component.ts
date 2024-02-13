import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { toggleTickerFavourite } from '../../../../state/market-data/market-data.actions';
import {
  selectCurrentTickerData,
  selectIsTickerFavourite,
} from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';

@Component({
  selector: 'md-stock-summary',
  standalone: true,
  imports: [AsyncPipe, PriceDirective, DecimalPipe],
  templateUrl: './stock-summary.component.html',
  styleUrl: './stock-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockSummaryComponent {
  data$: Observable<TickerData | undefined>;
  isFavourite$: Observable<boolean>;

  constructor(private store: Store) {
    this.data$ = this.store.select(selectCurrentTickerData);
    this.isFavourite$ = this.store.select(selectIsTickerFavourite);
  }

  favourite(ticker: string, add: boolean) {
    this.store.dispatch(toggleTickerFavourite({ ticker, add }));
  }
}
