import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketDataRestService } from '../../services/data-rest.service';
import { MiniChartComponent } from './mini-chart.component';

describe('MiniChartComponent', () => {
  let component: MiniChartComponent;
  let fixture: ComponentFixture<MiniChartComponent>;
  const marketRestSvcMock = jasmine.createSpyObj('MarketDataRestService', ['aggregates']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniChartComponent],
      providers: [
        {
          provide: MarketDataRestService,
          useValue: marketRestSvcMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MiniChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup chart on load', () => {
    // TODO:
  });

  it('should call aggregates() on snapshot input change', () => {
    // TODO:
  });
});
