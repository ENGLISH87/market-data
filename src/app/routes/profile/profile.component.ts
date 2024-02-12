import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StandardTemplateComponent } from '../../core/templates/standard-template/standard-template.component';

@Component({
  selector: 'md-profile',
  standalone: true,
  imports: [MatIconModule, StandardTemplateComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
