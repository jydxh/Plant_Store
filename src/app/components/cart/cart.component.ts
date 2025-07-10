import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [MatIconModule],
})
export class CartComponent implements OnInit, OnDestroy {
  totalItems: number = 0;
  totalCount: number = 0;
  isShowNote = false;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, public cartService: CartService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.shoppingCartQuantity.subscribe({
        next: (value) => (this.totalItems = value),
        error: (error) => console.error(error),
      })
    );
    this.subscription.add(
      this.cartService.shoppingCartCount.subscribe({
        next: (value) => (this.totalCount = value),
        error: (error) => console.error(error),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  directToCartPage() {
    console.log('clicked');
    this.router.navigate(['/cart']);
  }
  showNote() {
    this.isShowNote = true;
  }
  hideNote() {
    this.isShowNote = false;
  }
}
