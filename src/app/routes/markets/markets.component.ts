import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { DataTableComponent } from '../../core/components/data-table/data-table.component';
import { ColumnConfig, dataTableCols, rowLinkGenerator } from '../../core/models/tables.models';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { getAllSnapshots, getStockFavourites } from '../../state/market-data/market-data.actions';
import { selectAllSnapshots } from '../../state/market-data/market-data.selectors';
import { FavouritesTickerComponent } from '../dashboard/components/favourites-ticker/favourites-ticker.component';

@Component({
  selector: 'md-markets',
  standalone: true,
  imports: [
    MatIconModule,
    StandardTemplateComponent,
    FavouritesTickerComponent,
    DataTableComponent,
    AsyncPipe,
  ],
  templateUrl: './markets.component.html',
})
export class MarketsComponent implements OnInit {
  cols: ColumnConfig[] = dataTableCols;
  all$ = this.store.select(selectAllSnapshots);
  linkGenerator = rowLinkGenerator;

  constructor(private store: Store) {}

  ngOnInit() {
    [getAllSnapshots(), getStockFavourites()].forEach((a) => this.store.dispatch(a));
  }
}
