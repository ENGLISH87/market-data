import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataTableComponent } from '../../../../core/components/data-table/data-table.component';
import { SnapshotInfo } from '../../../../core/models/polygon.io.models';
import { dataTableCols, rowLinkGenerator } from '../../../../core/models/tables.models';
import { getGainersLosers } from '../../../../state/market-data/market-data.actions';
import {
  selectFavouriteSnapshots,
  selectGainers,
  selectLosers,
} from '../../../../state/market-data/market-data.selectors';

@Component({
  selector: 'md-gainers-losers',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatProgressSpinnerModule, DataTableComponent],
  templateUrl: './gainers-losers.component.html',
  styleUrl: './gainers-losers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GainersLosersComponent implements OnInit {
  private gainers$: Observable<SnapshotInfo[]> = this.store.select(selectGainers);
  private losers$: Observable<SnapshotInfo[]> = this.store.select(selectLosers);
  private favourites$: Observable<SnapshotInfo[]> = this.store.select(selectFavouriteSnapshots);

  rowLinkFn = rowLinkGenerator;
  cols = dataTableCols;
  tabs: [string, Observable<SnapshotInfo[]>][] = [
    ['Biggest Gainers', this.gainers$],
    ['Biggest Losers', this.losers$],
    ['Favourites', this.favourites$],
  ];

  constructor(private store: Store) {}

  ngOnInit() {
    // TODO: create single action with associated effect to retrieve all data
    // @ngrx/avoid-dispatching-multiple-actions-sequentially
    [getGainersLosers({ direction: 'gainers' }), getGainersLosers({ direction: 'losers' })].forEach(
      (a) => this.store.dispatch(a),
    );
  }
}
