import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mdHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private prev: number | undefined;

  @Input() set smdHighlight(value: number | undefined) {
    this.calcHighlight(value);
    this.prev = value;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  calcHighlight(value: number | undefined) {
    if (value !== undefined && this.prev !== undefined) {
      this.renderer.removeClass(this.el.nativeElement, 'price-up');
      this.renderer.removeClass(this.el.nativeElement, 'price-down');

      value > this.prev
        ? this.renderer.addClass(this.el.nativeElement, 'price-up')
        : value < this.prev
          ? this.renderer.addClass(this.el.nativeElement, 'price-down')
          : null; // do nothing
    }
  }
}
