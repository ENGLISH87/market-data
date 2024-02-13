import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { toggleSidebar } from '../../../state/ui-settings/ui-settings.actions';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'md-nav',
  standalone: true,
  imports: [RouterModule, SearchComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Input() title: string | undefined;

  constructor(private store: Store) {}

  toggle() {
    this.store.dispatch(toggleSidebar());
  }
}
