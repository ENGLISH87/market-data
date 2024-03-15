import { cloneDeep } from 'lodash-es';
import {
  BIGGEST_GAINERS_MOCK,
  BIGGEST_LOSERS_MOCK,
  LATEST_PRICE_MOCK,
  SNAPSHOT_INFO_MOCK,
  SNAPSHOT_SUMMARY_MOCK,
  UNI_SNAPSHOT_MOCK,
} from '../../../test/market-data.mock';
import { MOCK_DATA_STATE } from '../../../test/state.mock';
import * as DataActions from './market-data.actions';
import { marketDataReducer } from './market-data.reducers';
import { INITIAL_MARKET_DATA_STATE, MarketDataState } from './market-data.state';

describe('marketDataReducer', () => {
  let mockState: MarketDataState;

  beforeEach(() => {
    mockState = cloneDeep(MOCK_DATA_STATE);
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const exp = MOCK_DATA_STATE;
      const res = marketDataReducer(undefined, { type: '' });
      expect(res).toEqual(exp);
    });
  });

  describe('setCurrentTicker', () => {
    it('should set current ticker', () => {
      // arrange
      mockState.currentTicker = 'test';

      // act
      const action = DataActions.setCurrentTicker({ t: 'test' });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res).toEqual(mockState);
    });
  });

  describe('getStockFavouritesSuccess', () => {
    it('should update tickers with favourites data', () => {
      // arrange
      mockState.tickers['test'] = {
        snapshot: SNAPSHOT_INFO_MOCK,
      };

      // act
      const action = DataActions.getStockFavouritesSuccess({ snapshots: [SNAPSHOT_INFO_MOCK] });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res.tickers).toEqual(mockState.tickers);
    });
  });

  describe('getTickerSnapshotsSuccess', () => {
    it('should update ticker snapshot', () => {
      // arrange
      mockState.tickers['test'] = {
        uniSnapshot: UNI_SNAPSHOT_MOCK,
      };

      // act
      const action = DataActions.getTickerSnapshotsSuccess({ snapshots: [UNI_SNAPSHOT_MOCK] });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res.tickers).toEqual(mockState.tickers);
    });
  });

  describe('getTickerSummarySuccess', () => {
    it('should update ticker summary', () => {
      // arrange
      mockState.tickers['test'] = {
        summary: SNAPSHOT_SUMMARY_MOCK,
      };

      // act
      const action = DataActions.getTickerSummarySuccess({ summary: SNAPSHOT_SUMMARY_MOCK });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res).toEqual(mockState);
    });
  });

  describe('toggleTickerFavourite', () => {
    it('should add ticker to favourites', () => {
      // arrange
      mockState.favourites.push('test');

      // act
      const action = DataActions.toggleTickerFavourite({ add: true, ticker: 'test' });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res.favourites).toContain('test');
    });

    it('should remove ticker from favourites', () => {
      // arrange
      mockState.favourites.push('test');

      // act
      const action = DataActions.toggleTickerFavourite({ add: false, ticker: 'test' });
      const res = marketDataReducer(mockState, action);

      // assert
      expect(res.favourites).not.toContain('test');
    });
  });

  describe('receivedPriceMessage', () => {
    it('should update ticker with latest price data', () => {
      // arrange
      mockState.tickers['test'] = {};

      // act
      const action = DataActions.receivedPriceMessage({ data: LATEST_PRICE_MOCK });
      const res = marketDataReducer(mockState, action);

      // assert
      expect(res.tickers['test']?.latestPrice).toEqual(LATEST_PRICE_MOCK);
    });
  });

  describe('getGainersLosersSuccess', () => {
    it('should update biggest gainers', () => {
      // arrange
      mockState.gainers = [SNAPSHOT_INFO_MOCK];

      // act
      const action = DataActions.getGainersLosersSuccess({
        direction: 'gainers',
        data: BIGGEST_GAINERS_MOCK,
      });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res).toEqual(mockState);
    });

    it('should update biggest losers', () => {
      // arrange
      mockState.losers = [SNAPSHOT_INFO_MOCK];

      // act
      const action = DataActions.getGainersLosersSuccess({
        direction: 'losers',
        data: BIGGEST_LOSERS_MOCK,
      });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res).toEqual(mockState);
    });
  });

  describe('getAllSnapshotsSuccess', () => {
    it('should update snapshots', () => {
      // arrange
      mockState.tickers['test'] = {
        snapshot: SNAPSHOT_INFO_MOCK,
      };

      // act
      const action = DataActions.getAllSnapshotsSuccess({ snapshots: [SNAPSHOT_INFO_MOCK] });
      const res = marketDataReducer(INITIAL_MARKET_DATA_STATE, action);

      // assert
      expect(res).toEqual(mockState);
    });
  });
});
