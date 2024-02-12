import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardTemplateComponent } from './standard-template.component';

describe('StandardTemplateComponent', () => {
  let component: StandardTemplateComponent;
  let fixture: ComponentFixture<StandardTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardTemplateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StandardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
