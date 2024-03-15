import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardTemplateMockComponent } from '../../../test/component.mocks';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(SettingsComponent, {
        remove: { imports: [StandardTemplateComponent] },
        add: { imports: [StandardTemplateMockComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
