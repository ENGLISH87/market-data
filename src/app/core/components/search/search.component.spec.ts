import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MarketDataRestService } from '../../services/data-rest.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let marketRestSvc: MarketDataRestService;
  let store: MockStore;
  let router: Router;

  const marketRestSvcMock: jasmine.SpyObj<MarketDataRestService> = jasmine.createSpyObj(
    'MarketDataRestService',
    ['search'],
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, RouterTestingModule, MatAutocompleteModule],
      providers: [
        provideMockStore(),
        {
          provide: MarketDataRestService,
          useValue: marketRestSvcMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    marketRestSvc = TestBed.inject(MarketDataRestService);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search() on ticker input', fakeAsync(() => {
    marketRestSvcMock.search.and.returnValue(of([]));

    const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputEl.value = 'test';
    inputEl.dispatchEvent(new Event('input'));

    expect(marketRestSvc.search).not.toHaveBeenCalled();
    tick(300);
    expect(marketRestSvc.search).toHaveBeenCalled();
  }));

  it('should dispatch setCurrentTicker on selection and navigate to markets page', () => {
    // TODO: test full flow of autocomplete select from template
    component.selectTicker({
      option: { value: { ticker: 'test' } },
    } as MatAutocompleteSelectedEvent);

    expect(router.navigate).toHaveBeenCalledWith(['markets', 'test']);
  });
});
