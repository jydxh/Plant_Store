import { Injectable } from '@angular/core';
import { CartItem } from './cart.module';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = new BehaviorSubject<CartItem[]>([
    /* {
      name: '11',
      price: 1,
      productId: 'adsfa',
      quantity: 10,
    },
    {
      name: '11',
      price: 1,
      productId: 'adsfa',
      quantity: 12,
    }, */
  ]);
  constructor() {}
  private maxQuantity = 9;
  private minQuantity = 1;
  /*  asObservable to make the cartItems read only */
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }
  /* 	shoppingCartQuantity */
  shoppingCartQuantity: Observable<number> = this.cartItems
    .asObservable()
    .pipe(
      map((cartItems) => cartItems.reduce((acc, cur) => acc + cur.quantity, 0))
    );

  /* shoppingCartCount: number of distinct products */
  shoppingCartCount: Observable<number> = this.cartItems
    .asObservable()
    .pipe(map((cartItems) => cartItems.length));
}
