import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'md-sidebar',
  standalone: true,
  imports: [RouterModule, ThemeSwitchComponent, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
