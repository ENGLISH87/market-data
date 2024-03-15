import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TimeagoModule } from 'ngx-timeago';
import { of } from 'rxjs';
import { NEWS_ITEM_MOCK } from '../../../../test/market-data.mock';
import { MarketDataRestService } from '../../services/data-rest.service';
import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let marketRestSvc: MarketDataRestService;

  const marketRestSvcMock = jasmine.createSpyObj('MarketDataRestService', {
    loadNews: of([NEWS_ITEM_MOCK]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsComponent, RouterTestingModule, TimeagoModule.forRoot()],
      providers: [
        {
          provide: MarketDataRestService,
          useValue: marketRestSvcMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    marketRestSvc = TestBed.inject(MarketDataRestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch latest news on component load', () => {
    expect(marketRestSvc.loadNews).toHaveBeenCalledWith();
    expect(fixture.debugElement.queryAll(By.css('.item')).length).toEqual(1);
  });

  it('should get latest news for input provided ticker', () => {
    component.ticker = 'test';
    fixture.detectChanges();

    expect(marketRestSvc.loadNews).toHaveBeenCalledWith('test');
  });
});
