import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  AllMockComponent,
  FavouritesTickerMockComponent,
  StandardTemplateMockComponent,
} from '../../../test/component.mocks';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { getStockFavourites } from '../../state/market-data/market-data.actions';
import { FavouritesTickerComponent } from '../dashboard/components/favourites-ticker/favourites-ticker.component';
import { AllComponent } from './components/all/all.component';
import { MarketsComponent } from './markets.component';

describe('MarketsComponent', () => {
  let component: MarketsComponent;
  let fixture: ComponentFixture<MarketsComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketsComponent, MatIconModule],
      providers: [provideMockStore()],
    })
      .overrideComponent(MarketsComponent, {
        remove: {
          imports: [StandardTemplateComponent, FavouritesTickerComponent, AllComponent],
        },
        add: {
          imports: [StandardTemplateMockComponent, FavouritesTickerMockComponent, AllMockComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketsComponent);
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getStockFavourites action on load', () => {
    expect(store.dispatch).toHaveBeenCalledWith(getStockFavourites());
  });
});
