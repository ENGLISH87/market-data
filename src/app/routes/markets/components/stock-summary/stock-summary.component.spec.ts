import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { environment } from '../../../../../environments/environment';
import { TICKER_DATA } from '../../../../../test/market-data.mock';
import { toggleTickerFavourite } from '../../../../state/market-data/market-data.actions';
import {
  selectCurrentTickerData,
  selectIsTickerFavourite,
} from '../../../../state/market-data/market-data.selectors';
import { StockSummaryComponent } from './stock-summary.component';

describe('StockSummaryComponent', () => {
  let component: StockSummaryComponent;
  let fixture: ComponentFixture<StockSummaryComponent>;
  let debugEl: DebugElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockSummaryComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectCurrentTickerData, value: TICKER_DATA },
            { selector: selectIsTickerFavourite, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockSummaryComponent);
    store = TestBed.inject(MockStore);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display stock summary data on load', () => {
    const h2Exp = `${TICKER_DATA.summary?.name} (${TICKER_DATA.summary?.ticker})`;
    const h2El = debugEl.query(By.css('h2'));
    const aEl = debugEl.query(By.css(`a[href="${TICKER_DATA.summary?.homepage_url}"]`));
    const imgEl = debugEl.query(
      By.css(
        `img[src="${TICKER_DATA.summary?.branding?.icon_url}?apikey=${environment.polygonApiKey}"]`,
      ),
    );

    expect(h2El.nativeElement.textContent).toContain(h2Exp);
    expect(aEl).toBeTruthy();
    expect(imgEl).toBeTruthy();
  });

  it('should display pricing info on load', () => {
    const priceEl = debugEl.query(By.css('p.latest-price'));
    const exp = `${TICKER_DATA.uniSnapshot?.session?.price}`;
    expect(priceEl.nativeElement.textContent).toContain(exp);
  });

  it('should dispatch action toggleTickerFavourite on watch list btn click', () => {
    spyOn(store, 'dispatch');

    let favBtn: HTMLButtonElement = debugEl.query(By.css('section button')).nativeElement;
    expect(favBtn.textContent).toContain('Add to watch list');

    favBtn.click();
    expect(store.dispatch).toHaveBeenCalledWith(
      toggleTickerFavourite({ ticker: 'test', add: true }),
    );

    store.overrideSelector(selectIsTickerFavourite, true);
    store.refreshState();
    fixture.detectChanges();

    favBtn = debugEl.query(By.css('section button')).nativeElement;
    expect(favBtn.textContent).toContain('Remove from watch list');
  });
});
