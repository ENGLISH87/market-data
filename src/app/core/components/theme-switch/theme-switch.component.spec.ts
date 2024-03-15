import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleGroupHarness } from '@angular/material/button-toggle/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { toggleDarkMode } from '../../../state/ui-settings/ui-settings.actions';
import { selectIsDarkMode } from '../../../state/ui-settings/ui-settings.selectors';
import { ThemeSwitchComponent } from './theme-switch.component';

describe('ThemeSwitchComponent', () => {
  let fixture: ComponentFixture<ThemeSwitchComponent>;
  let store: MockStore;
  let renderer: Renderer2;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitchComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSwitchComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);

    renderer = fixture.debugElement.injector.get(Renderer2);
    spyOn(renderer, 'addClass');
    spyOn(renderer, 'removeClass');

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectIsDarkMode, false);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */

  it('should add body.dark if state darkMode true', () => {
    expect(renderer.addClass).not.toHaveBeenCalledWith(document.body, 'dark');
    expect(renderer.removeClass).toHaveBeenCalledWith(document.body, 'dark');

    store.overrideSelector(selectIsDarkMode, true);
    store.refreshState();
    fixture.detectChanges();

    expect(renderer.addClass).toHaveBeenCalledWith(document.body, 'dark');
  });

  it('should add body.dark if ui button for dark clicked', async () => {
    const buttonGroup = await loader.getHarness(MatButtonToggleGroupHarness);
    const btns = await buttonGroup.getToggles();
    await btns[1].check();

    expect(store.dispatch).toHaveBeenCalledWith(toggleDarkMode({ dark: true }));
  });

  it('should remove body.dark if ui button for light clicked', async () => {
    store.overrideSelector(selectIsDarkMode, true);
    store.refreshState();
    fixture.detectChanges();

    const buttonGroup = await loader.getHarness(MatButtonToggleGroupHarness);
    const btns = await buttonGroup.getToggles();
    await btns[0].check();

    expect(store.dispatch).toHaveBeenCalledWith(toggleDarkMode({ dark: false }));
  });
});
