import { AsyncPipe, NgClass } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SearchMockComponent } from '../../../../test/component.mocks';
import { SearchComponent } from '../search/search.component';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch toggleSidebar action on toggle button click', () => {
    // TODO:
  });

  it('should display red ring if websocket disconnected', () => {
    // TODO:
  });

  it('should display green ring if websocket connected', () => {
    // TODO:
  });
});
