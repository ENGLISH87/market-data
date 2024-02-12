import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'md-nav',
  standalone: true,
  imports: [RouterModule, SearchComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Input() title: string | undefined;

  constructor() {}
}
