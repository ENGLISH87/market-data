import { AsyncPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ThemeSwitchMockComponent } from '../../../../test/component.mocks';
import { ThemeSwitchComponent } from '../theme-switch/theme-switch.component';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have visible class is state showSidebar true', () => {
    // TODO:
  });

  it('should not have visible class is state showSidebar false', () => {
    // TODO:
  });

  it('should dispatch toggleSidebar on toggle button click', () => {
    // TODO:
  });
});
