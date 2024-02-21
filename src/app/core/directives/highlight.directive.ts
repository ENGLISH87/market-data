import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mdHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private prev: number | undefined;
  private timeoutId: number | undefined;

  @Input() set mdHighlight(value: number | undefined) {
    this.renderer.addClass(this.el.nativeElement, 'highlight');
    this.calcHighlight(value);
    this.prev = value;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  calcHighlight(value: number | undefined) {
    if (value !== undefined && this.prev !== undefined) {
      const cls: string = value > this.prev ? 'up' : value < this.prev ? 'down' : ''; // do nothing

      if (cls) {
        window.clearTimeout(this.timeoutId);
        this.renderer.removeClass(this.el.nativeElement, 'up');
        this.renderer.removeClass(this.el.nativeElement, 'down');

        this.renderer.addClass(this.el.nativeElement, cls);

        this.timeoutId = window.setTimeout(() => {
          this.renderer.removeClass(this.el.nativeElement, cls);
        }, 700);
      }
    }
  }
}
