import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { getStockFavourites } from '../../state/market-data/market-data.actions';
import { FavouritesTickerComponent } from '../dashboard/components/favourites-ticker/favourites-ticker.component';
import { AllComponent } from './components/all/all.component';

@Component({
  selector: 'md-markets',
  standalone: true,
  imports: [MatIconModule, StandardTemplateComponent, FavouritesTickerComponent, AllComponent],
  templateUrl: './markets.component.html',
})
export class MarketsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getStockFavourites());
  }
}
