import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PriceSummaryComponent } from './price-summary.component';

describe('PriceSummaryComponent', () => {
  let component: PriceSummaryComponent;
  let fixture: ComponentFixture<PriceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceSummaryComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display price data for today and markets early_trading', () => {
    // TODO:
  });

  it('should display price data for today and markets open', () => {
    // TODO:
  });

  it('should display price data for today and markets closed', () => {
    // TODO:
  });

  it('should display price data for today and markets late_trading', () => {
    // TODO:
  });

  it('should display price data for yesterday', () => {
    // TODO:
  });
});
