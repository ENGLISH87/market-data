import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MiniChartComponent } from '../../../../core/components/mini-chart/mini-chart.component';
import { HighlightDirective } from '../../../../core/directives/highlight.directive';
import { PriceDirective } from '../../../../core/directives/price.directive';
import { selectFavouriteTickers } from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';

@Component({
  selector: 'md-favourites-ticker',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    FavouritesTickerComponent,
    DecimalPipe,
    HighlightDirective,
    PriceDirective,
    MiniChartComponent,
  ],
  templateUrl: './favourites-ticker.component.html',
  styleUrl: './favourites-ticker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavouritesTickerComponent {
  favourites$: Observable<TickerData[]>;

  constructor(private store: Store) {
    this.favourites$ = store.select(selectFavouriteTickers);
  }
}
