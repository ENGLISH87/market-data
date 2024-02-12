import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getStockFavourites } from '../../state/actions/market-data.actions';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'md-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getStockFavourites());
  }
}
