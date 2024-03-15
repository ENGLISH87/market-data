import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PriceDirective } from './price.directive';

@Component({
  standalone: true,
  template: `<div [mdPrice]="num">{{ num }}</div>`,
  imports: [PriceDirective],
})
class TestingComponent {
  @Input() num: number = 0;
}

describe('PriceDirective', () => {
  let fixture: ComponentFixture<TestingComponent>;
  let component: TestingComponent;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [PriceDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestingComponent, PriceDirective],
    }).createComponent(TestingComponent);

    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add price-up class if number > 0', () => {
    component.num = 5;
    fixture.detectChanges();
    const divEl: HTMLDivElement = debugEl.query(By.css('div')).nativeElement;

    expect(divEl.classList).toContain('price-up');
  });

  it('should add price-down class if number < 0', () => {
    component.num = -5;
    fixture.detectChanges();
    const divEl: HTMLDivElement = debugEl.query(By.css('div')).nativeElement;

    expect(divEl.classList).toContain('price-down');
  });

  it('should add no class if price 0', () => {
    component.num = 0;
    fixture.detectChanges();
    const divEl: HTMLDivElement = debugEl.query(By.css('div')).nativeElement;

    expect(divEl.classList).not.toContain('price-up');
    expect(divEl.classList).not.toContain('price-down');
  });
});
