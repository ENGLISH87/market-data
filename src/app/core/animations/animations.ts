import { animate, style, transition, trigger } from '@angular/animations';

export const routeStateTrigger = trigger('routeState', [
  transition('*<=>*', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
]);

export const fadeInOnly = trigger('fadeInOnly', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in-out', style({ opacity: 1 })),
  ]),
]);

export const ruleSlideInOut = trigger('slideInOut', [
  transition(':enter', [
    style({ height: '0', opacity: '0' }),
    animate('300ms ease-in-out', style({ height: '*', opacity: '1' })),
  ]),
  transition(':leave', [animate('300ms ease-in-out', style({ height: '0', opacity: '0' }))]),
]);

export const horizontalSlideIn = trigger('horizontalSlideIn', [
  transition(':enter', [style({ width: 0 }), animate('200ms ease-in-out', style({ width: '*' }))]),
  transition(':leave', [animate('200ms ease-in-out', style({ width: 0 }))]),
]);
