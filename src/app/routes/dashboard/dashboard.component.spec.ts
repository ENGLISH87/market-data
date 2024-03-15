import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  FavouritesTickerMockComponent,
  GainersLosersMockComponent,
  NewsMockComponent,
  StandardTemplateMockComponent,
} from '../../../test/component.mocks';
import { NewsComponent } from '../../core/components/news/news.component';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { getStockFavourites } from '../../state/market-data/market-data.actions';
import { FavouritesTickerComponent } from './components/favourites-ticker/favourites-ticker.component';
import { GainersLosersComponent } from './components/gainers-losers/gainers-losers.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideMockStore()],
    })
      .overrideComponent(DashboardComponent, {
        remove: {
          imports: [
            StandardTemplateComponent,
            FavouritesTickerComponent,
            GainersLosersComponent,
            NewsComponent,
          ],
        },
        add: {
          imports: [
            StandardTemplateMockComponent,
            FavouritesTickerMockComponent,
            GainersLosersMockComponent,
            NewsMockComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getStockFavourites action on component load', () => {
    expect(store.dispatch).toHaveBeenCalledWith(getStockFavourites());
  });
});
