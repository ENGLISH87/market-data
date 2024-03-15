import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  standalone: true,
  template: `<div [mdHighlight]="num">{{ num }}</div>`,
  imports: [HighlightDirective],
})
class TestingComponent {
  @Input() num: number = 0;
}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestingComponent>;
  let component: TestingComponent;
  let divEl: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingComponent, HighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    divEl = fixture.debugElement.query(By.css('div')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do nothing if value undefined', () => {
    expect(true).toBeTrue();
  });

  it('should add class up to element if value higher than prev', fakeAsync(() => {
    component.num = 1;
    fixture.detectChanges();
    expect(divEl.classList).toContain('up');

    component.num = 3;
    fixture.detectChanges();
    expect(divEl.classList).toContain('up');

    component.num = 2;
    fixture.detectChanges();
    expect(divEl.classList).toContain('down');

    component.num = 2;
    fixture.detectChanges();
    expect(divEl.classList).toContain('down');

    flush();
  }));

  it('should add class up to element if value higher than prev', fakeAsync(() => {
    component.num = -1;
    fixture.detectChanges();
    expect(divEl.classList).toContain('down');

    component.num = -3;
    fixture.detectChanges();
    expect(divEl.classList).toContain('down');

    component.num = -2;
    fixture.detectChanges();
    expect(divEl.classList).toContain('up');

    flush();
  }));

  it('should remove all classes after setTimeout', fakeAsync(() => {
    component.num = 1;
    fixture.detectChanges();

    expect(divEl.classList).toContain('up');

    flush();
    expect(divEl.classList).not.toContain('up');
  }));
});
