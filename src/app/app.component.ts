import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/components/nav/nav.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';

@Component({
  selector: 'md-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
