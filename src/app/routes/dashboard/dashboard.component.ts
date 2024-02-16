import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { NewsComponent } from '../../core/components/news/news.component';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { getStockFavourites } from '../../state/market-data/market-data.actions';
import { FavouritesTickerComponent } from './components/favourites-ticker/favourites-ticker.component';
import { GainersLosersComponent } from './components/gainers-losers/gainers-losers.component';

@Component({
  selector: 'md-dashboard',
  standalone: true,
  imports: [
    MatIconModule,
    StandardTemplateComponent,
    FavouritesTickerComponent,
    GainersLosersComponent,
    NewsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getStockFavourites());
  }
}
