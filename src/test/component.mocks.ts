import { Component, Input } from '@angular/core';

@Component({
  selector: 'md-standard-template',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class StandardTemplateMockComponent {
  @Input() title: string | undefined;
}

@Component({ selector: 'md-favourites-ticker', standalone: true, template: '' })
export class FavouritesTickerMockComponent {}

@Component({ selector: 'md-all', standalone: true, template: '' })
export class AllMockComponent {}

@Component({ selector: 'md-search', standalone: true, template: '' })
export class SearchMockComponent {}

@Component({ selector: 'md-nav', standalone: true, template: '' })
export class NavMockComponent {}

@Component({ selector: 'md-sidebar', standalone: true, template: '' })
export class SidebarMockComponent {}

@Component({ selector: 'md-theme-switch', standalone: true, template: '' })
export class ThemeSwitchMockComponent {}

@Component({ selector: 'md-gainers-losers', standalone: true, template: '' })
export class GainersLosersMockComponent {}

@Component({ selector: 'md-news', standalone: true, template: '' })
export class NewsMockComponent {
  @Input() ticker: string | undefined;
}

@Component({ selector: 'md-chart', standalone: true, template: '' })
export class ChartMockComponent {
  @Input() ticker: string | undefined;
}

@Component({ selector: 'md-stock-summary', standalone: true, template: '' })
export class StockSummaryMockComponent {}

@Component({ selector: 'md-price-summary', standalone: true, template: '' })
export class PriceSummaryMockComponent {}
