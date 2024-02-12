import { Inject, Injectable } from '@angular/core';
import { IRestClient, UniversalSnapshotInfo } from '@polygon.io/client-js';
import { CandlestickData, UTCTimestamp } from 'lightweight-charts';
import moment from 'moment';
import { from, map, Observable } from 'rxjs';
import { POLYGON_CLIENT } from '../../app.config';
import { Timespan } from '../models/agg.model';
import {
  ITickerDetailsResults,
  ITickerNewsResults,
  ITickersResults,
  SnapshotInfo,
} from '../models/polygon.io.models';

@Injectable({
  providedIn: 'root',
})
export class MarketDataRestService {
  constructor(@Inject(POLYGON_CLIENT) private rest: IRestClient) {}

  /**
   * Search stock tickers
   * @param search ticker search string
   * @returns ITickersResults[]
   */
  search(search: string): Observable<ITickersResults[]> {
    return from(
      this.rest.reference.tickers({
        search,
        order: 'asc',
      }),
    ).pipe(map((ticks) => ticks.results));
  }

  /**
   * Retrieve full details for a given ticker
   * @param ticker ticker string
   * @returns ITickerDetailsResults
   */
  tickerDetails(ticker: string): Observable<ITickerDetailsResults> {
    return from(this.rest.reference.tickerDetails(ticker)).pipe(map((res) => res.results!));
  }

  /**
   * Retrieve news for a given ticker, generic news returned if no ticker provided
   * @param ticker stock ticker
   * @returns Observable<ITickerNewsResults[]>
   */
  loadNews(ticker?: string): Observable<ITickerNewsResults[]> {
    return from(
      this.rest.reference.tickerNews({
        ticker,
        limit: 50,
      }),
    ).pipe(map((res) => res.results));
  }

  /**
   * Retrieve snapshot data for a given ticker
   * @param ticker
   * @returns Observable<UniversalSnapshotInfo>
   */
  snapshot(ticker: string): Observable<UniversalSnapshotInfo> {
    return from(
      this.rest.stocks.universalSnapshot({
        'ticker.any_of': ticker,
      }),
    ).pipe(map((res) => res.results![0]));
  }

  /**
   * Retrieve snapshot data for a given tickers
   * @param tickers
   * @returns Observable<UniversalSnapshotInfo[]>
   */
  universalSnapshot(tickers: string[]): Observable<UniversalSnapshotInfo[]> {
    return from(
      this.rest.stocks.universalSnapshot({
        'ticker.any_of': tickers.toString(),
      }),
    ).pipe(map((res) => res.results || []));
  }

  /**
   * Retrieve list of top gainers/losers
   * @param direction 'gainers' | 'losers'
   * @returns
   */
  snapshotGainersLosers(direction: 'gainers' | 'losers'): Observable<SnapshotInfo[]> {
    return from(this.rest.stocks.snapshotGainersLosers(direction)).pipe(
      map((res) => res.tickers || []),
    );
  }

  /**
   * Fetch ticker aggregate data for a given timespan
   * @param ticker stock ticker
   * @param multiplier size of the timespan multiplier.
   * @param timespan size of the time window
   * @param frm start of the aggregate time window
   * @returns aggregates data array
   */
  aggregates(
    ticker: string,
    multiplier = 1,
    timespan = Timespan.day,
    frm?: Date,
    to?: Date,
  ): Observable<CandlestickData[]> {
    const fromString = this.getFromDate(timespan, frm);
    const toString = (moment(to) || moment()).format('YYYY-MM-DD');

    return from(
      this.rest.stocks.aggregates(ticker, multiplier, timespan, fromString, toString, {
        limit: 150000,
      }),
    ).pipe(
      map((res) =>
        (res.results || []).map((agg) => {
          const utcTS = (moment.utc(agg.t).valueOf() / 1000) as UTCTimestamp;

          return {
            time: utcTS,
            open: agg.o || 0,
            close: agg.c || 0,
            low: agg.l || 0,
            high: agg.h || 0,
          } as CandlestickData;
        }),
      ),
    );
  }

  private getFromDate(ts: Timespan, frm?: Date): string {
    if (frm) {
      return moment().subtract(30, 'days').format('YYYY-MM-DD');
    }

    switch (ts) {
      case Timespan.minute:
        return moment().subtract(12, 'hours').format('YYYY-MM-DD');
      case Timespan.hour:
        return moment().subtract(720, 'hours').format('YYYY-MM-DD');
      case Timespan.day:
        return moment().subtract(720, 'days').format('YYYY-MM-DD');
      case Timespan.week:
        return moment().subtract(720, 'weeks').format('YYYY-MM-DD');
      case Timespan.month:
        return moment().subtract(100, 'months').format('YYYY-MM-DD');
      default:
        return moment().subtract(720, 'days').format('YYYY-MM-DD');
    }
  }
}
