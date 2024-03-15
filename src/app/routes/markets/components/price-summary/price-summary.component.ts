import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { ShortNumberPipe } from '../../../../core/pipes/short-number.pipe';
import { selectCurrentTickerData } from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';

@Component({
  selector: 'md-price-summary',
  standalone: true,
  imports: [CommonModule, PriceDirective, ShortNumberPipe],
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

  getYestMs(ns: number = 0): number {
    return ns / 1000000 - 86400000;
  }

  getPercentChange(o: number = 0, c: number = 0): string {
    return (((c - o) / Math.abs(o)) * 100).toFixed(2);
  }
}
