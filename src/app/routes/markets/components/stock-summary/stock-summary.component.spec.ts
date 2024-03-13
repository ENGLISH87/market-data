import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StockSummaryComponent } from './stock-summary.component';

describe('StockSummaryComponent', () => {
  let component: StockSummaryComponent;
  let fixture: ComponentFixture<StockSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockSummaryComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(StockSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display stock summary data on load', () => {
    // TODO:
  });

  it('should dispatch action toggleTickerFavourite on watch list btn click', () => {
    // TODO:
  });
});
