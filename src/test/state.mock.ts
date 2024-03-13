import { MarketDataState } from '../app/state/market-data/market-data.state';
import { UiSettingsState } from '../app/state/ui-settings/ui-settings.reducer';

export const MOCK_UI_STATE: UiSettingsState = {
  darkMode: false,
  showSidebar: false,
  connected: false,
};

export const MOCK_DATA_STATE: MarketDataState = {
  currentTicker: undefined,
  favourites: [
    'NVDA',
    'TSLA',
    'AAPL',
    'MSFT',
    'GOOGL',
    'META',
    'NFLX',
    'AMZN',
    'LLY',
    'TSM',
    'NVO',
    'JPM',
    'WMT',
    'PG',
    'MAT',
  ],
  gainers: [],
  losers: [],
  subscribed: [],
  tickers: {},
};
