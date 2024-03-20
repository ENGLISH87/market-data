import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
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
    NestedPropertyPipe,
    PriceDirective,
    ShortNumberPipe,
  ],
  templateUrl: './data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input() data!: unknown[];
  @Input() cols!: ColumnConfig[];

  COL_TYPE = ColumnType;
}
