import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { SnapshotInfo } from '../../../../core/models/polygon.io.models';
import { ShortNumberPipe } from '../../../../core/pipes/short-number.pipe';
import { getGainersLosers } from '../../../../state/market-data/market-data.actions';
import {
  selectFavouriteSnapshots,
  selectGainers,
  selectLosers,
} from '../../../../state/market-data/market-data.selectors';

@Component({
  selector: 'md-gainers-losers',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTabsModule,
    MatProgressSpinnerModule,
    TableModule,
    PriceDirective,
    ShortNumberPipe,
  ],
  templateUrl: './gainers-losers.component.html',
  styleUrl: './gainers-losers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GainersLosersComponent implements OnInit {
  gainers$: Observable<SnapshotInfo[]> = this.store.select(selectGainers);
  losers$: Observable<SnapshotInfo[]> = this.store.select(selectLosers);
  favourites$: Observable<SnapshotInfo[]> = this.store.select(selectFavouriteSnapshots);

  cols: string[] = [
    'ticker',
    'day.vw',
    'todaysChange',
    'todaysChangePerc',
    'day.o',
    'day.v',
    'prevDay.c',
    'prevDay.o',
    'prevDay.l',
    'prevDay.h',
    'prevDay.v',
    'min.t',
  ];

  constructor(private store: Store) {}

  ngOnInit() {
    /* eslint-disable @ngrx/avoid-dispatching-multiple-actions-sequentially */
    this.store.dispatch(getGainersLosers({ direction: 'gainers' }));
    this.store.dispatch(getGainersLosers({ direction: 'losers' }));
  }
}
