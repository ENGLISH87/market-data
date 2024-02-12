import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';

@Component({
  selector: 'md-settings',
  standalone: true,
  imports: [MatIconModule, StandardTemplateComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {}
