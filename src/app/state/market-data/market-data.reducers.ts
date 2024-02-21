import { createReducer, on } from '@ngrx/store';
import * as DataActions from './market-data.actions';
import {
  INITIAL_MARKET_DATA_STATE,
  setTicker,
  updateAllSnapshots,
  updateFavourites,
  updateFromMessage,
  updateGainersLosers,
  updateTickerSnapshot,
  updateTickerSummary,
} from './market-data.state';

export const marketDataReducer = createReducer(
  INITIAL_MARKET_DATA_STATE,

  on(DataActions.setCurrentTicker, setTicker),
  on(DataActions.getTickerSnapshotsSuccess, updateTickerSnapshot),
  on(DataActions.getTickerSummarySuccess, updateTickerSummary),
  on(DataActions.toggleTickerFavourite, updateFavourites),
  on(DataActions.receivedPriceMessage, updateFromMessage),
  on(DataActions.getGainersLosersSuccess, updateGainersLosers),
  on(DataActions.getAllSnapshotsSuccess, updateAllSnapshots),
);
