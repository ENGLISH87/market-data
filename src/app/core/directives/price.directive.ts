import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mdPrice]',
  standalone: true,
})
export class PriceDirective {
  @Input() set smdPrice(value: number | undefined) {
    this.updateClasses(value);
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  updateClasses(price: number | undefined) {
    this.renderer.removeClass(this.el.nativeElement, 'price-up');
    this.renderer.removeClass(this.el.nativeElement, 'price-down');

    if (price) {
      price > 0
        ? this.renderer.addClass(this.el.nativeElement, 'price-up')
        : price < 0
          ? this.renderer.addClass(this.el.nativeElement, 'price-down')
          : null; // do nothing
    }
  }
}
