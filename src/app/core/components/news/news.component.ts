import { AsyncPipe, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { Observable } from 'rxjs';
import { ITickerNewsResults } from '../../models/polygon.io.models';
import { MarketDataRestService } from '../../services/data-rest.service';

@Component({
  selector: 'md-news',
  standalone: true,
  imports: [RouterModule, AsyncPipe, SlicePipe, TimeagoModule, MatProgressSpinnerModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {
  @Input() set ticker(tick: string | undefined) {
    this.news$ = this.marketRestSvc.loadNews(tick);
  }

  news$: Observable<ITickerNewsResults[] | undefined> | undefined;

  // TODO: switch to ngrx approach for retrieving data
  constructor(private marketRestSvc: MarketDataRestService) {}

  ngOnInit() {
    this.news$ ??= this.marketRestSvc.loadNews();
  }
}
