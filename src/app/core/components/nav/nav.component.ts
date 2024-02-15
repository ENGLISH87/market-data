import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleSidebar } from '../../../state/ui-settings/ui-settings.actions';
import { selectIsConnected } from '../../../state/ui-settings/ui-settings.selectors';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'md-nav',
  standalone: true,
  imports: [AsyncPipe, NgClass, SearchComponent, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Input() title: string | undefined;
  connected$: Observable<boolean>;

  constructor(private store: Store) {
    this.connected$ = store.select(selectIsConnected);
  }

  toggle() {
    this.store.dispatch(toggleSidebar());
  }
}
