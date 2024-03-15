import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as MockComponents from '../../../../../test/component.mocks';
import { TICKER_DATA } from '../../../../../test/market-data.mock';
import { ChartComponent } from '../../../../core/components/chart/chart.component';
import { NewsComponent } from '../../../../core/components/news/news.component';
import { StandardTemplateComponent } from '../../../../core/templates/standard-template/standard-template.component';
import * as DataActions from '../../../../state/market-data/market-data.actions';
import { selectCurrentTickerData } from '../../../../state/market-data/market-data.selectors';
import { PriceSummaryComponent } from '../price-summary/price-summary.component';
import { StockSummaryComponent } from '../stock-summary/stock-summary.component';
import { StockComponent } from './stock.component';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;
  let debugEl: DebugElement;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StockComponent,
        CommonModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatTabsModule,
      ],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: { params: of({ ticker: 'test' }) } },
      ],
    })
      .overrideComponent(StockComponent, {
        remove: {
          imports: [
            StandardTemplateComponent,
            ChartComponent,
            NewsComponent,
            StockSummaryComponent,
            PriceSummaryComponent,
          ],
        },
        add: {
          imports: [
            MockComponents.StandardTemplateMockComponent,
            MockComponents.ChartMockComponent,
            MockComponents.NewsMockComponent,
            MockComponents.StockSummaryMockComponent,
            MockComponents.PriceSummaryMockComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockComponent);
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;

    store.overrideSelector(selectCurrentTickerData, TICKER_DATA);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch all actions on component load', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(4);
    expect(store.dispatch).toHaveBeenCalledWith(DataActions.setCurrentTicker({ t: 'test' }));
    expect(store.dispatch).toHaveBeenCalledWith(DataActions.subscribeToPriceEvents(['test']));
    expect(store.dispatch).toHaveBeenCalledWith(DataActions.getTickerSnapshot({ t: 'test' }));
    expect(store.dispatch).toHaveBeenCalledWith(DataActions.getTickerSummary({ t: 'test' }));
  });

  it('should dispatch action unsubscribePriceEvents on component destroy', () => {
    component.ngOnDestroy();
    expect(store.dispatch).toHaveBeenCalledWith(DataActions.unsubscribePriceEvents(['test']));
  });

  it('should display chart tab on component load', () => {
    const chartEl = debugEl.query(By.css('md-chart'));
    expect(chartEl).toBeTruthy();
  });

  it('should load news tab on tab click', async () => {
    const matTab = await loader.getHarness(MatTabGroupHarness);
    await matTab.selectTab({ label: 'News' });
    fixture.detectChanges();

    const newsEl = debugEl.query(By.css('md-news'));
    expect(newsEl).toBeTruthy();
  });

  it('should load stock summary data', () => {
    const summaryEl = debugEl.query(By.css('#summary-data > div'));
    const prevCloseTxt = summaryEl.query(By.css('div:nth-child(1) > span:nth-child(2)'))
      .nativeElement.textContent;
    const openTxt = summaryEl.query(By.css('div:nth-child(2) > span:nth-child(2)')).nativeElement
      .textContent;
    const volTxt = summaryEl.query(By.css('div:nth-child(5) > span:nth-child(2)')).nativeElement
      .textContent;
    const mcTxt = summaryEl.query(By.css('div:nth-child(7) > span:nth-child(2)')).nativeElement
      .textContent;
    const sicTxt = summaryEl.query(By.css('div:nth-child(8) > span:nth-child(2)')).nativeElement
      .textContent;
    const employeesTxt = summaryEl.query(By.css('div:nth-child(10) > span:nth-child(2)'))
      .nativeElement.textContent;

    expect(prevCloseTxt).toContain(TICKER_DATA.uniSnapshot?.session?.previous_close);
    expect(openTxt).toContain(TICKER_DATA.uniSnapshot?.session?.open);
    expect(volTxt).toContain('1M');
    expect(mcTxt).toContain('1M');
    expect(sicTxt).toContain(TICKER_DATA.summary?.sic_code);
    expect(employeesTxt).toContain(TICKER_DATA.summary?.total_employees);
  });
});
