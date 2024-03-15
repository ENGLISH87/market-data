import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cloneDeep } from 'lodash-es';
import { SNAPSHOT_INFO_MOCK, TICKER_DATA } from '../../../../../test/market-data.mock';
import { selectCurrentTickerData } from '../../../../state/market-data/market-data.selectors';
import { TickerData } from '../../../../state/market-data/market-data.state';
import { PriceSummaryComponent } from './price-summary.component';

describe('PriceSummaryComponent', () => {
  let component: PriceSummaryComponent;
  let fixture: ComponentFixture<PriceSummaryComponent>;
  let debugEl: DebugElement;
  let store: MockStore;
  let mockData: TickerData;

  const setData = (data: TickerData) => {
    store.overrideSelector(selectCurrentTickerData, data);
    store.refreshState();
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceSummaryComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSummaryComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;

    mockData = cloneDeep(TICKER_DATA);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display price data for today - markets early_trading', () => {
    mockData.uniSnapshot!.market_status = 'early_trading';
    setData(mockData);

    const h3Txt = debugEl.query(By.css('h3')).nativeElement.textContent;
    const earlyPriceTxt = debugEl.query(By.css('.price-early')).nativeElement.textContent;

    expect(h3Txt).toEqual('Early Trading');
    expect(earlyPriceTxt).toContain(mockData.uniSnapshot?.session?.price);
  });

  it('should display price data for today - markets open', () => {
    mockData.uniSnapshot!.market_status = 'open';
    setData(mockData);

    const h3Txt = debugEl.query(By.css('h3')).nativeElement.textContent;
    const priceTxt = debugEl.query(By.css('.price-now')).nativeElement.textContent;

    expect(h3Txt).toEqual('Now');
    expect(priceTxt).toContain(mockData.uniSnapshot?.session?.price);
  });

  it('should display price data for today - markets closed', () => {
    mockData.uniSnapshot!.market_status = 'closed';
    setData(mockData);

    const h3Txt = debugEl.query(By.css('h3')).nativeElement.textContent;
    const closePriceTxt = debugEl.query(By.css('.price-close')).nativeElement.textContent;

    expect(h3Txt).toEqual('Market Closed');
    expect(closePriceTxt).toContain(mockData.uniSnapshot?.session?.close);
  });

  it('should display price data for today - markets late_trading', () => {
    mockData.uniSnapshot!.market_status = 'late_trading';
    setData(mockData);

    const h3Txt = debugEl.query(By.css('h3')).nativeElement.textContent;
    const latePriceTxt = debugEl.query(By.css('.price-late')).nativeElement.textContent;

    expect(h3Txt).toEqual('Late Trading');
    expect(latePriceTxt).toContain(mockData.uniSnapshot?.session?.price);
  });

  it('should display price data for yesterday', () => {
    mockData.snapshot = SNAPSHOT_INFO_MOCK;
    setData(mockData);
    const todayBtn: HTMLButtonElement = debugEl.queryAll(By.css('button'))[0].nativeElement;
    const yesterdayBtn: HTMLButtonElement = debugEl.queryAll(By.css('button'))[1].nativeElement;

    expect(todayBtn.classList).toContain('active');

    yesterdayBtn.click();
    fixture.detectChanges();

    const openTxt = debugEl.query(By.css('.price-open')).nativeElement.textContent;
    const closeTxt = debugEl.query(By.css('.price-close')).nativeElement.textContent;

    expect(yesterdayBtn.classList).toContain('active');
    expect(openTxt).toContain(mockData.snapshot.prevDay.o);
    expect(closeTxt).toContain(mockData.snapshot.prevDay.c);
  });
});
