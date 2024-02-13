import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PriceDirective } from '../../../../core/directives/price.directive';

@Component({
  selector: 'md-gainers-losers',
  standalone: true,
  imports: [
    RouterLink,
    MatTabsModule,
    MatProgressSpinnerModule,
    PriceDirective,
    AsyncPipe,
    DecimalPipe,
  ],
  templateUrl: './gainers-losers.component.html',
  styleUrl: './gainers-losers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GainersLosersComponent {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  gainers$: Observable<any[]> = of([]);
  losers$: Observable<any[]> = of([]);
}
