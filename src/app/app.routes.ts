import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { MarketsComponent } from './routes/markets/markets.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { SettingsComponent } from './routes/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'MD | Dashboard',
  },
  {
    path: 'markets',
    component: MarketsComponent,
    title: 'MD | Markets',
  },
  {
    path: 'markets/:ticker',
    component: MarketsComponent,
    title: (route: ActivatedRouteSnapshot) => `MD | ${route.params['ticker']} $`,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'MD | Profile',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'MD | Settings',
  },
  { path: '**', redirectTo: '/' },
];
