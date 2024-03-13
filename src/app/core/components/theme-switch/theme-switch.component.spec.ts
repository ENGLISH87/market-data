import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ThemeSwitchComponent } from './theme-switch.component';

describe('ThemeSwitchComponent', () => {
  let component: ThemeSwitchComponent;
  let fixture: ComponentFixture<ThemeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitchComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add body.dark if state darkMode true', () => {
    // TODO:
  });

  it('should remove body.dark if state darkMode false', () => {
    // TODO:
  });

  it('should add body.dark if ui button for dark clicked', () => {
    // TODO:
  });

  it('should remove body.dark if ui button for light clicked', () => {
    // TODO:
  });
});
