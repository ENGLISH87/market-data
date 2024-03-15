import { AsyncPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ThemeSwitchMockComponent } from '../../../../test/component.mocks';
import { toggleSidebar } from '../../../state/ui-settings/ui-settings.actions';
import { selectIsSidebarVisible } from '../../../state/ui-settings/ui-settings.selectors';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: MockStore;
  let sidebarEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule, AsyncPipe],
      providers: [provideMockStore()],
    })
      .overrideComponent(SidebarComponent, {
        remove: { imports: [ThemeSwitchComponent] },
        add: { imports: [ThemeSwitchMockComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectIsSidebarVisible, false);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
    sidebarEl = fixture.debugElement.query(By.css('aside')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have visible class is state showSidebar true', () => {
    expect(sidebarEl.classList).not.toContain('visible');

    store.overrideSelector(selectIsSidebarVisible, true);
    store.refreshState();
    fixture.detectChanges();

    expect(sidebarEl.classList).toContain('visible');
  });

  it('should not have visible class if state showSidebar false', () => {
    expect(sidebarEl.classList).not.toContain('visible');
  });

  it('should dispatch toggleSidebar on toggle button click', () => {
    const toggleBtn = fixture.debugElement.query(By.css('button')).nativeElement;
    toggleBtn.click();

    expect(store.dispatch).toHaveBeenCalledWith(toggleSidebar());
  });
});
