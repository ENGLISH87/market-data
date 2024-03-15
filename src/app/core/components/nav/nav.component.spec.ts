import { AsyncPipe, NgClass } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SearchMockComponent } from '../../../../test/component.mocks';
import { toggleSidebar } from '../../../state/ui-settings/ui-settings.actions';
import { selectIsConnected } from '../../../state/ui-settings/ui-settings.selectors';
import { SearchComponent } from '../search/search.component';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let debugEl: DebugElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, AsyncPipe, NgClass],
      providers: [provideMockStore()],
    })
      .overrideComponent(NavComponent, {
        remove: { imports: [SearchComponent] },
        add: { imports: [SearchMockComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectIsConnected, true);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleSidebar action on toggle button click', () => {
    const toggleBtn = debugEl.queryAll(By.css('button'))[0].nativeElement;
    toggleBtn.click();

    expect(store.dispatch).toHaveBeenCalledWith(toggleSidebar());
  });

  it('should display green ring if websocket connected', () => {
    expect(debugEl.query(By.css('.connected'))).toBeDefined();
  });

  it('should display red ring if websocket disconnected', () => {
    store.overrideSelector(selectIsConnected, false);
    store.refreshState();
    fixture.detectChanges();

    expect(debugEl.query(By.css('.connected'))).toBeNull();
  });
});
