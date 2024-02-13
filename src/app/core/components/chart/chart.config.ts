import { ColorType } from 'lightweight-charts';
import moment from 'moment';

export const chartConfig = {
  layout: {
    textColor: 'white',
    background: { type: ColorType.Solid, color: 'transparent' },
  },
  grid: {
    horzLines: { color: '#1b2224' },
    vertLines: { color: '#1b2224' },
  },
  localization: {
    timeFormatter: (ts: number) => {
      // TODO: only show time when viewing minute/hour intervals
      return moment(ts * 1000).format("DD MMM 'YY HH:mm");
    },
  },
};
