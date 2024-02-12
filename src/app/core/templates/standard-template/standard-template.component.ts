import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'md-standard-template',
  standalone: true,
  imports: [NavComponent, SidebarComponent],
  templateUrl: './standard-template.component.html',
  styleUrl: './standard-template.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardTemplateComponent {
  @Input() title: string | undefined;
}
