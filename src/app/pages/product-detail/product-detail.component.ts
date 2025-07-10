import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountryService } from 'src/app/services/country.service';
import { Property } from 'src/app/services/product.module';
import { ProductService } from 'src/app/services/product.service';
import { TimeDiffService } from 'src/app/time-diff.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, MatIconModule],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Property | undefined = undefined;
  isLoading = false;
  // if any error occurred at fetching data, the page will redirect to 404 page

  private subscription: Subscription = new Subscription();
  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public countryService: CountryService,
    private timeDiffService: TimeDiffService
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
  get imageUrls() {
    if (this.product) {
      return this.product.image.map((i) => i.imageUrl);
    }
    return [];
  }
  get getCountryName() {
    if (this.product) {
      return this.countryService.getCountryName(this.product.country);
    }
    return '';
  }
  get getBedRoom() {
    if (this.product)
      return `${this.product.bedrooms} bedroom${
        this.product.bedrooms > 1 ? 's' : ''
      }`;
    return '';
  }
  get getBath() {
    if (this.product)
      return `${this.product.baths} bath${
        this.product.bedrooms > 1 ? 's' : ''
      }`;
    return '';
  }
  get getGuest() {
    if (this.product)
      return `${this.product.guests} guest${
        this.product.guests > 1 ? 's' : ''
      }`;
    return '';
  }

  get getHostingTime() {
    if (this.product)
      return this.timeDiffService.calculateYearDiff(
        this.product.user.createAt as Date
      );
    return '';
  }
}
