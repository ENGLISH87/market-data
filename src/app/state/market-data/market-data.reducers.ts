import { createReducer, on } from '@ngrx/store';
import * as DataActions from './market-data.actions';
import {
  INITIAL_MARKET_DATA_STATE,
  setTicker,
  updateTickerSnapshot,
  updateTickerSummary,
} from './market-data.state';

export const marketDataReducer = createReducer(
  INITIAL_MARKET_DATA_STATE,

  on(DataActions.setCurrentTicker, setTicker),
  on(DataActions.getTickerSnapshotSuccess, updateTickerSnapshot),
  on(DataActions.getTickerSummarySuccess, updateTickerSummary),
);
