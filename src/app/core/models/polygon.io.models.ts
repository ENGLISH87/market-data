/** Manually adding Polygon.io interfaces that aren't currently exported */

export interface ITickersResults {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_symbol?: string;
  currency_name?: string;
  base_currency_symbol?: string;
  base_currency_name?: string;
  cik?: string;
  composite_figi?: string;
  share_class_fig?: string;
  last_updated_utc?: string;
  deslisted_utc?: string;
}

export interface ITickerNewsResults {
  amp_url?: string;
  article_url?: string;
  author?: string;
  description?: string;
  id: string;
  image_url?: string;
  keywords?: string[];
  published_utc: string;
  publisher: Publisher;
  tickers: string[];
  title: string;
}

declare type Publisher = {
  favicon_url?: string;
  homepage_url?: string;
  logo_url?: string;
  name?: string;
};

export interface ITickerDetailsResults {
  active?: boolean;
  address?: {
    address1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
  };
  branding?: {
    icon_url?: string;
    logo_url?: string;
  };
  cik?: number;
  composite_figi?: string;
  currency_name?: string;
  description?: string;
  homepage_url?: string;
  list_date?: string;
  locale?: string;
  market?: string;
  market_cap?: number;
  name?: string;
  phone_number?: string;
  primary_exchange?: string;
  round_lot?: number;
  share_class_figi?: string;
  share_class_shares_outstanding?: number;
  sic_code?: number;
  sic_description?: string;
  ticker?: string;
  ticker_root?: string;
  total_employees?: number;
  type?: string;
  weighted_shares_outstanding?: number;
  source_feed?: string;
}

export interface SnapshotInfo {
  day?: SnapshotDay;
  lastQuote?: SnapshotLastQuote;
  lastTrade?: SnapshotLastTrade;
  min?: SnapshotMin;
  prevDay?: SnapshotPrevDay;
  ticker?: string;
  todaysChange?: number;
  todaysChangePerc?: number;
  updated?: number;
}

interface SnapshotDay {
  c?: number;
  h?: number;
  l?: number;
  o?: number;
  v?: number;
  vw?: number;
}

interface SnapshotLastQuote {
  P?: number;
  S?: number;
  p?: number;
  s?: number;
  t?: number;
}
interface SnapshotLastTrade {
  c?: string[];
  i?: string;
  p?: number;
  s?: number;
  t?: number;
  x?: number;
}
interface SnapshotMin {
  av?: number;
  c?: number;
  h?: number;
  l?: number;
  o?: number;
  v?: number;
  vw?: number;
}
interface SnapshotPrevDay {
  c?: number;
  h?: number;
  l?: number;
  o?: number;
  v?: number;
  vw?: number;
  t?: number;
  n?: number;
}

export interface IAggsResults {
  T?: string;
  c?: number;
  h?: number;
  l?: number;
  n?: number;
  o?: number;
  t?: number;
  v?: number;
  vw?: number;
}
