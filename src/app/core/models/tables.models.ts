export enum ColumnType {
  Text,
  ShortNumber,
  Price,
  PriceChange,
  Date,
}

export interface ColumnConfig {
  field: string;
  label: string;
  type: ColumnType;
  sortable?: boolean;
}

export const rowLinkGenerator = (row: object) => ['/markets', row['ticker' as keyof object]];

export const dataTableCols: ColumnConfig[] = [
  {
    field: 'ticker',
    label: 'Symbol',
    type: ColumnType.Text,
    sortable: true,
  },
  {
    field: 'day.vw',
    label: 'Price',
    type: ColumnType.Price,
    sortable: true,
  },
  {
    field: 'todaysChange',
    label: '1D',
    type: ColumnType.PriceChange,
    sortable: true,
  },
  {
    field: 'todaysChangePerc',
    label: '1D %',
    type: ColumnType.PriceChange,
    sortable: true,
  },
  {
    field: 'day.o',
    label: 'Open',
    type: ColumnType.Price,
    sortable: true,
  },
  {
    field: 'day.h',
    label: 'High',
    type: ColumnType.Price,
    sortable: true,
  },
  {
    field: 'day.v',
    label: 'Vol',
    type: ColumnType.ShortNumber,
    sortable: true,
  },
  {
    field: 'prevDay.o',
    label: 'Prev Open',
    type: ColumnType.Price,
    sortable: true,
  },
  {
    field: 'prevDay.c',
    label: 'Prev Close',
    type: ColumnType.Price,
    sortable: true,
  },
  {
    field: 'prevDay.h',
    label: 'Prev High',
    type: ColumnType.Price,
    sortable: true,
  },
  {
    field: 'prevDay.l',
    label: 'Prev Low',
    type: ColumnType.Price,
    sortable: true,
  },
  {
    field: 'prevDay.v',
    label: 'Prev Vol',
    type: ColumnType.ShortNumber,
    sortable: true,
  },
  {
    field: 'min.t',
    label: 'Updated',
    type: ColumnType.Date,
    sortable: true,
  },
];
