import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { MiniChartComponent } from '../../../../core/components/mini-chart/mini-chart.component';
import { HighlightDirective } from '../../../../core/directives/highlight.directive';
import { PriceDirective } from '../../../../core/directives/price.directive';
import {
  subscribeToPriceEvents,
  unsubscribePriceEvents,
} from '../../../../state/market-data/market-data.actions';
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
export class FavouritesTickerComponent implements OnDestroy {
  favourites$: Observable<TickerData[]>;
  subscribed: string[] | undefined;

  constructor(private store: Store) {
    this.favourites$ = store
      .select(selectFavouriteTickers)
      .pipe(tap((favs) => this.subscribeToEvents(favs)));
  }

  ngOnDestroy(): void {
    this.store.dispatch(unsubscribePriceEvents(this.subscribed || []));
  }

  private subscribeToEvents(favs: TickerData[]) {
    // on first load, subscribe to price change messages
    if (!this.subscribed && favs.length > 0) {
      this.subscribed = favs.reduce((acc: string[], cur) => {
        cur.uniSnapshot?.ticker && acc.push(cur.uniSnapshot?.ticker);
        return acc;
      }, []);
      this.store.dispatch(subscribeToPriceEvents(this.subscribed));
    }
  }
}
