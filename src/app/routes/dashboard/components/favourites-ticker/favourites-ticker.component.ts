import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { getStockFavourites } from '../../../../state/market-data/market-data.actions';
import { selectFavouriteTickers } from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';

@Component({
  selector: 'md-favourites-ticker',
  standalone: true,
  imports: [RouterLink, AsyncPipe, FavouritesTickerComponent, DecimalPipe, PriceDirective],
  templateUrl: './favourites-ticker.component.html',
  styleUrl: './favourites-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesTickerComponent implements OnInit {
  favourites$: Observable<TickerData[]>;

  constructor(private store: Store) {
    this.favourites$ = store.select(selectFavouriteTickers);
  }

  ngOnInit() {
    this.store.dispatch(getStockFavourites());
  }
}
