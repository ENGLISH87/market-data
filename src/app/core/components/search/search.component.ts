import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, Observable, of, switchMap } from 'rxjs';
import { setSelectedTicker } from '../../../state/actions/market-data.actions';
import { ITickersResults } from '../../models/polygon.io.models';
import { MarketDataService } from '../../services/market-data.service';

@Component({
  selector: 'md-search',
  standalone: true,
  imports: [MatAutocompleteModule, AsyncPipe, ReactiveFormsModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  options$: Observable<ITickersResults[]> = of([]);
  searchCtrl: FormControl = new FormControl();

  constructor(
    private router: Router,
    private store: Store,
    private marketDataSvc: MarketDataService,
  ) {}

  ngOnInit() {
    this.options$ = this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      switchMap((search) => this.marketDataSvc.search(search)),
    );
  }

  selectTicker(select: MatAutocompleteSelectedEvent) {
    const val: ITickersResults = select.option.value;
    this.store.dispatch(setSelectedTicker({ t: val.ticker }));
    this.router.navigate(['markets', val.ticker]);
  }

  displayFn = (val: ITickersResults | undefined) => (val ? `${val?.ticker} // ${val?.name}` : '');
}
