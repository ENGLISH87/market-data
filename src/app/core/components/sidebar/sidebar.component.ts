import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsSidebarVisible } from '../../../state/ui-settings/ui-settings.selectors';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';

@Component({
  selector: 'md-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeSwitchComponent, MatIconModule, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  visible$: Observable<boolean>;

  constructor(private store: Store) {
    this.visible$ = store.select(selectIsSidebarVisible);
  }
}
