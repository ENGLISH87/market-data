import { ColorType, DeepPartial, TimeChartOptions } from 'lightweight-charts';
import moment from 'moment';

export const chartConfig: DeepPartial<TimeChartOptions> = {
  layout: {
    textColor: 'white',
    background: { type: ColorType.Solid, color: 'transparent' },
  },
  grid: {
    horzLines: { color: '#1b2224' },
    vertLines: { color: '#1b2224' },
  },
  autoSize: true,
  handleScroll: {
    vertTouchDrag: false,
    pressedMouseMove: false,
    mouseWheel: false,
    horzTouchDrag: false,
  },
  handleScale: {
    mouseWheel: false,
    pinch: false,
    axisPressedMouseMove: false,
  },
  timeScale: {
    fixLeftEdge: true,
    fixRightEdge: true,
  },
  localization: {
    timeFormatter: (ts: number) => {
      return moment(ts * 1000).format("DD MMM 'YY HH:mm");
    },
  },
};
