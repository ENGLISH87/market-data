import { DeepPartial, TimeChartOptions } from 'lightweight-charts';

export const miniChartConfig: DeepPartial<TimeChartOptions> = {
  layout: {
    textColor: '#d1d4dc',
    background: {
      color: 'transparent',
    },
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      visible: false,
    },
  },
  rightPriceScale: {
    visible: false,
    borderVisible: false,
  },
  timeScale: {
    visible: false,
    borderVisible: false,
  },
  crosshair: {
    vertLine: {
      visible: false,
    },
    horzLine: {
      visible: false,
    },
  },
  handleScale: {
    mouseWheel: false,
    pinch: false,
    axisPressedMouseMove: false,
  },
  handleScroll: {
    horzTouchDrag: false,
    vertTouchDrag: false,
    mouseWheel: false,
    pressedMouseMove: false,
  },
};
