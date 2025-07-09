import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  templateUrl: './nav-item.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class NavItemComponent {
  @Input() href!: string;
  @Input() exact: boolean = false;
  @Input() name!: string;
}
