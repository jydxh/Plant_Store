import { Injectable } from '@angular/core';
import { CartItem } from './cart.module';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems = new BehaviorSubject<CartItem[]>([
    {
      name: 'Mountain Retreat',
      price: 656,
      productId: '789ca087-627a-4fe8-a049-de88b04033b4',
      quantity: 3,
    },
    {
      name: 'Luxury Penthouse',
      price: 71,
      productId: 'e9704a11-7084-4af8-9478-eec877a1bd03',
      quantity: 3,
    },
  ]);
  constructor() {}
  private maxQuantity = 9;
  private minQuantity = 1;
  /*  asObservable to make the cartItems read only */
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  /* add items to cart */
  addItems(add: CartItem): void {
    const cartItemsValue = this.cartItems.value;
    const index = cartItemsValue.findIndex(
      (item) => item.productId === add.productId
    );
    if (index > -1) {
      // if item exist and the quantity is less than 9 will execute
      if (cartItemsValue[index].quantity < this.maxQuantity) {
        const copiedItems = [...cartItemsValue];
        copiedItems[index].quantity += 1;
        this.cartItems.next(copiedItems);
      }
    } else {
      // first time add the product
      this.cartItems.next([...cartItemsValue, add]);
    }
  }

  /* partD step4 */
  /* update cart item helper function */
  private updateCartItem(
    id: string,
    action: 'increment' | 'decrement' | 'remove'
  ) {
    const cartItemsValue = this.cartItems.value;
    const index = cartItemsValue.findIndex((item) => item.productId === id);

    if (index === -1) {
      console.warn(`Item with id ${id} not found`);
      return;
    }
    const copiedItems = [...cartItemsValue];
    const currentItem = copiedItems[index];

    switch (action) {
      case 'increment':
        if (currentItem.quantity < this.maxQuantity) {
          currentItem.quantity += 1;
          this.cartItems.next(copiedItems);
        } else {
          console.error(
            'cannot add quantity since the value can only be 1 - 9 '
          );
        }
        break;
      case 'decrement':
        if (currentItem.quantity > this.minQuantity) {
          currentItem.quantity -= 1;
          this.cartItems.next(copiedItems);
        } else {
          console.error('cannot reduce the quantity below 1');
        }
        break;

      case 'remove':
        copiedItems.splice(index, 1);
        this.cartItems.next(copiedItems);
    }
  }

  /* remove item from cart */
  removeItem(id: string): void {
    this.updateCartItem(id, 'remove');
  }

  /* add product quantity */
  addQuantity(id: string): void {
    this.updateCartItem(id, 'increment');
  }

  /* reduce product quantity */
  reduceQuantity(id: string): void {
    this.updateCartItem(id, 'decrement');
  }

  /*partE 	shoppingCartQuantity */
  shoppingCartQuantity: Observable<number> = this.cartItems
    .asObservable()
    .pipe(
      map((cartItems) => cartItems.reduce((acc, cur) => acc + cur.quantity, 0))
    );

  /*partE shoppingCartCount: number of distinct products */
  shoppingCartCount: Observable<number> = this.cartItems
    .asObservable()
    .pipe(map((cartItems) => cartItems.length));
}
