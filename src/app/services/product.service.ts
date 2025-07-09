import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { FetchedProductsResponse } from './product.module';

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
}
