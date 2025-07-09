import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatIconModule],
})
export class CartComponent {
  constructor(private router: Router) {}

  directToCartPage() {
    console.log('clicked');
    this.router.navigate(['/cart']);
  }
}
