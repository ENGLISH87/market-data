import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { getStockFavourites } from '../../state/market-data/market-data.actions';

@Component({
  selector: 'md-dashboard',
  standalone: true,
  imports: [MatIconModule, StandardTemplateComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(getStockFavourites());
  }
}
