import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { StandardTemplateMockComponent } from '../../../../../test/component.mocks';
import { StandardTemplateComponent } from '../../../../core/templates/standard-template/standard-template.component';
import { StockComponent } from './stock.component';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockComponent, CommonModule, RouterTestingModule],
      providers: [provideMockStore()],
    })
      .overrideComponent(StockComponent, {
        remove: { imports: [StandardTemplateComponent] },
        add: { imports: [StandardTemplateMockComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch all actions on component load', () => {
    // TODO:
  });

  it('should dispatch action unsubscribePriceEvents on component destroy', () => {
    // TODO:
  });

  it('should display chart tab on component load', () => {
    // TODO:
  });

  it('should load stock summary data', () => {
    // TODO:
  });
});
