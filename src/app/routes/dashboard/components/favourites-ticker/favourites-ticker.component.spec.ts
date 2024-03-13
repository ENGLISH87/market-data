import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FavouritesTickerComponent } from './favourites-ticker.component';

describe('FavouritesTickerComponent', () => {
  let component: FavouritesTickerComponent;
  let fixture: ComponentFixture<FavouritesTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritesTickerComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouritesTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to events for favourite tickers', () => {
    // TODO:
  });

  it('should dispatch unsubscribePriceEvents on component destroy', () => {
    // TODO:
  });
});
