import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/services/cart.module';
import { CartService } from 'src/app/services/cart.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  imports: [MatTableModule, CommonModule, RouterLink],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  cartItems: CartItem[] = [];
  shoppingCartQuantity: number = 0;
  shoppingCartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getCartItems().subscribe((value) => {
        this.cartItems = value;
        console.log('cartItems from subscribe: ', value);
      })
    );

    this.subscription.add(
      this.cartService.shoppingCartQuantity.subscribe((value) => {
        this.shoppingCartQuantity = value;
      })
    );

    this.subscription.add(
      this.cartService.shoppingCartCount.subscribe(
        (value) => (this.shoppingCartCount = value)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addQuantity(id: string) {
    this.cartService.addQuantity(id);
  }
  reduceQuantity(id: string) {
    this.cartService.reduceQuantity(id);
  }
  removeItem(id: string) {
    this.cartService.removeItem(id);
  }
}
