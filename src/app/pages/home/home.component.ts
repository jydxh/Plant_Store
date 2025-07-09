import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FetchedProductsResponse } from 'src/app/services/product.module';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  productsResponse: FetchedProductsResponse | undefined = undefined;
  isLoading = false;
  error: string | null = null;
  currentPage = 1;
  private subscription: Subscription = new Subscription();

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        this.currentPage = +params['page'] || 1;
        this.loadProducts();
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;
    this.productService.fetchProducts(this.currentPage).subscribe({
      next: (data) => {
        console.log('products: ', data);
        this.productsResponse = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.error = 'failed to load data';
        this.isLoading = false;
      },
    });
  }
  getImageUrls(images: { id: string; propertyId: string; imageUrl: string }[]) {
    return images.map((img) => img.imageUrl);
  }
}
