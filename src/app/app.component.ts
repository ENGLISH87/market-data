import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { routeStateTrigger } from './core/animations/animations';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { apiConnect } from './state/ui-settings/ui-settings.actions';

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
  }
}
