import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { selectCurrentTickerData } from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';

@Component({
  selector: 'md-price-summary',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, PriceDirective],
  templateUrl: './price-summary.component.html',
  styleUrl: './price-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceSummaryComponent {
  data$: Observable<TickerData | undefined>;
  today: boolean = true;

  constructor(private store: Store) {
    this.data$ = this.store.select(selectCurrentTickerData);
  }
}
