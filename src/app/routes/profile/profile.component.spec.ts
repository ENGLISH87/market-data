import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardTemplateMockComponent } from '../../../test/component.mocks';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
    })
      .overrideComponent(ProfileComponent, {
        remove: { imports: [StandardTemplateComponent] },
        add: { imports: [StandardTemplateMockComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
