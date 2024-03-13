import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { GainersLosersComponent } from './gainers-losers.component';

describe('GainersLosersComponent', () => {
  let component: GainersLosersComponent;
  let fixture: ComponentFixture<GainersLosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GainersLosersComponent, NoopAnimationsModule],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(GainersLosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getGainersLosers and getGainersLosers on load', () => {
    // TODO:
  });

  it('should load biggest gainers table', () => {
    // TODO:
  });

  it('should load biggest losers table on tab click', () => {
    // TODO:
  });

  it('should load favourites table on tab click', () => {
    // TODO:
  });
});
