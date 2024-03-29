import { Component, Input } from '@angular/core';
import { ColumnConfig } from '../app/core/models/tables.models';

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

@Component({ selector: 'md-data-table', standalone: true, template: '' })
export class DataTableMockComponent {
  @Input() data!: unknown[];
  @Input() cols!: ColumnConfig[];
  @Input() defaultSort?: string;
  @Input() showPaging?: boolean;
  @Input() showCaption?: boolean;
  @Input() globalFilterFields?: string[];
  @Input() title?: string;
  @Input() searchPlaceholder?: string;
  @Input() rowLinkFn?: (data: object) => string[];
}
