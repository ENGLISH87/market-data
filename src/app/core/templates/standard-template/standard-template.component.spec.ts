import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMockComponent, SidebarMockComponent } from '../../../../test/component.mocks';
import { NavComponent } from '../../components/nav/nav.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { StandardTemplateComponent } from './standard-template.component';

describe('StandardTemplateComponent', () => {
  let component: StandardTemplateComponent;
  let fixture: ComponentFixture<StandardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardTemplateComponent],
    })
      .overrideComponent(StandardTemplateComponent, {
        remove: { imports: [NavComponent, SidebarComponent] },
        add: { imports: [NavMockComponent, SidebarMockComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(StandardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
