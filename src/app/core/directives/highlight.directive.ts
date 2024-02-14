import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mdHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private prev: number | undefined;

  @Input() set mdHighlight(value: number | undefined) {
    this.calcHighlight(value);
    this.prev = value;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  calcHighlight(value: number | undefined) {
    if (value !== undefined && this.prev !== undefined) {
      this.renderer.removeClass(this.el.nativeElement, 'highlight-up');
      this.renderer.removeClass(this.el.nativeElement, 'highlight-down');

      value > this.prev
        ? this.renderer.addClass(this.el.nativeElement, 'highlight-up')
        : value < this.prev
          ? this.renderer.addClass(this.el.nativeElement, 'highlight-down')
          : null; // do nothing
    }
  }
}
