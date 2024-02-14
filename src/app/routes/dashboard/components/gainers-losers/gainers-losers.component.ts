import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { getGainersLosers } from '../../../../state/market-data/market-data.actions';
import { selectGainers, selectLosers } from '../../../../state/market-data/market-data.selectors';

@Component({
  selector: 'md-gainers-losers',
  standalone: true,
  imports: [
    RouterLink,
    MatTabsModule,
    MatProgressSpinnerModule,
    PriceDirective,
    AsyncPipe,
    DecimalPipe,
  ],
  templateUrl: './gainers-losers.component.html',
  styleUrl: './gainers-losers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GainersLosersComponent implements OnInit {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  gainers$: Observable<any[]> = this.store.select(selectGainers);
  losers$: Observable<any[]> = this.store.select(selectLosers);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getGainersLosers({ direction: 'gainers' }));
    this.store.dispatch(getGainersLosers({ direction: 'losers' }));
  }
}
