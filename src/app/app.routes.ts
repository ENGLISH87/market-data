import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { StockComponent } from './routes/markets/components/stock/stock.component';
import { MarketsComponent } from './routes/markets/markets.component';
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
    component: StockComponent,
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
