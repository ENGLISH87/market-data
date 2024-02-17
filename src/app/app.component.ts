import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { routeStateTrigger } from './core/animations/animations';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { subscribeToPriceEventsFactory } from './state/market-data/market-data.actions';
import { apiConnect } from './state/ui-settings/ui-settings.actions';
import { selectIsConnected } from './state/ui-settings/ui-settings.selectors';

@Component({
  selector: 'md-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  animations: [routeStateTrigger],
})
export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(apiConnect());

    // on connected, subscribe to price change events
    this.store
      .select(selectIsConnected)
      .pipe(
        filter((c) => c),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.store.dispatch(subscribeToPriceEventsFactory());
      });
  }
}
