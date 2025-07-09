import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { MatIconModule } from '@angular/material/icon';
import { NavItemComponent } from './nav-item/nav-item.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    CartComponent,
    MatIconModule,
    NavItemComponent,
    CommonModule,
    RouterLink,
  ],
})
export class HeaderComponent {
  NavLinks = [
    {
      href: '/',
      name: 'Home',
      exact: true,
    },
    {
      href: '/about-us',
      name: 'About',
    },
  ];
}
