import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Table, TableModule } from 'primeng/table';
import { PriceDirective } from '../../directives/price.directive';
import { ColumnConfig, ColumnType } from '../../models/tables.models';
import { NestedPropertyPipe } from '../../pipes/nested-property.pipe';
import { ShortNumberPipe } from '../../pipes/short-number.pipe';

@Component({
  selector: 'md-data-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    MatIconModule,
    NestedPropertyPipe,
    PriceDirective,
    ShortNumberPipe,
  ],
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input() data: unknown[] = [];
  @Input() cols: ColumnConfig[] = [];
  @Input() defaultSort?: string;
  @Input() showPaging?: boolean;
  @Input() showCaption?: boolean;
  @Input() globalFilterFields?: string[];
  @Input() title?: string;
  @Input() searchPlaceholder?: string;
  @Input() rowLinkFn?: (data: object) => string[];

  COL_TYPE = ColumnType;

  clear(table: Table) {
    table.clear();
  }
}
