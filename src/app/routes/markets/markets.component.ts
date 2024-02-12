import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';

@Component({
  selector: 'md-markets',
  standalone: true,
  imports: [MatIconModule, StandardTemplateComponent],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
})
export class MarketsComponent {}
