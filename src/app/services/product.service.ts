import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { FetchedProductsResponse, Property } from './product.module';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL = 'https://haochengportfolio.com/api';

  private productsSubject = new BehaviorSubject<FetchedProductsResponse | null>(
    null
  );
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // fetch products logic
  /* note: part C is asking create a hardcoded list of products in product service,
  here I am fetching the productLists from my own backend, and will consume this list
  at home page, and each product at home page will push the URL to /products/:id route,
  if no product found from backend, it will redirect to 404 page 
   */
  fetchProducts(page: number = 1): Observable<FetchedProductsResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http
      .get<FetchedProductsResponse>(this.API_URL + '/products', { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error('failed in fetch products'));
        })
      );
  }

  /* fetch the product detail by productId */
  fetchProductById(id: string): Observable<{ data: Property }> {
    return this.http
      .get<{ data: Property }>(
        this.API_URL + '/products/detail?productId=' + id
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error('failed in fetch products: ' + id));
        })
      );
  }
}
