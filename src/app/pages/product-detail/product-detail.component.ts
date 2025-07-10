import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/services/product.module';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Property | undefined = undefined;
  isLoading = false;
  // if any error occurred at fetching data, the page will redirect to 404 page

  private subscription: Subscription = new Subscription();
  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      /* part C : use route params to fetch the product and display details */
      this.route.params.subscribe((params) => {
        this.loadProductDetail(params['id']);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadProductDetail(id: string) {
    this.isLoading = true;

    this.productService.fetchProductById(id).subscribe({
      next: (data) => {
        console.log('product: ', data);
        this.product = data.data;
        this.isLoading = false;
      },
      error: (error) => {
        /* this is for the partC: if no product is found for the ID, redirect to the page not found */
        console.log(error);
        this.isLoading = false;
        this.router.navigate(['/notFound']);
      },
    });
  }
}
