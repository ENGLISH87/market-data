import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketDataRestService } from '../../services/data-rest.service';
import { MarketDataWsService } from '../../services/data-ws.service';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const marketRestSvc = jasmine.createSpyObj('MarketDataRestService', ['aggregates']);
  const marketWsSvc = jasmine.createSpyObj('MarketDataWsService', ['events']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
      providers: [
        {
          provide: MarketDataRestService,
          useValue: marketRestSvc,
        },
        {
          provide: MarketDataWsService,
          useValue: marketWsSvc,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setup chart on component load', () => {
    // TODO:
  });

  it('should update chart candle if live chart and new websocket price event received', () => {
    // TODO:
  });

  it('should update chart range on ui button click', () => {
    // TODO:
  });
});
