import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  FavouritesTickerMockComponent,
  GainersLosersMockComponent,
  NewsMockComponent,
  StandardTemplateMockComponent,
} from '../../../test/component.mocks';
import { NewsComponent } from '../../core/components/news/news.component';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { FavouritesTickerComponent } from './components/favourites-ticker/favourites-ticker.component';
import { GainersLosersComponent } from './components/gainers-losers/gainers-losers.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getStockFavourites action on component load', () => {
    // TODO:
  });
});
