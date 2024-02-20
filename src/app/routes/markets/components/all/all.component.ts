import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Table, TableModule } from 'primeng/table';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { ShortNumberPipe } from '../../../../core/pipes/short-number.pipe';
import { getAllSnapshots } from '../../../../state/market-data/market-data.actions';
import { selectAllSnapshots } from '../../../../state/market-data/market-data.selectors';

@Component({
  selector: 'md-all',
  standalone: true,
  imports: [
    TableModule,
    ShortNumberPipe,
    AsyncPipe,
    DecimalPipe,
    PriceDirective,
    RouterLink,
    DatePipe,
    MatIconModule,
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllComponent {
  all$ = this.store.select(selectAllSnapshots);

  constructor(private store: Store) {
    this.store.dispatch(getAllSnapshots());
  }

  clear(table: Table) {
    table.clear();
  }
}
