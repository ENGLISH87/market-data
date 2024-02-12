import { Component, Renderer2 } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { selectIsDarkMode } from '../../../state/selectors/ui-settings.selectors';
import { AsyncPipe } from '@angular/common';
import { toggleDarkMode } from '../../../state/actions/ui-settings.actions';

@Component({
  selector: 'md-theme-switch',
  standalone: true,
  imports: [AsyncPipe, MatButtonToggleModule, MatIconModule],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitchComponent {
  darkMode$: Observable<boolean>;

  constructor(
    private store: Store,
    private renderer: Renderer2,
  ) {
    this.darkMode$ = this.store.select(selectIsDarkMode).pipe(
      tap((dm) => {
        dm
          ? this.renderer.addClass(document.body, 'dark')
          : this.renderer.removeClass(document.body, 'dark');
      }),
    );
  }

  toggle(dark: boolean) {
    this.store.dispatch(toggleDarkMode({ dark }));
  }
}
