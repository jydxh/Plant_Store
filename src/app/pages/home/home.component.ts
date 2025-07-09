import { Component } from '@angular/core';
import { FetchedProductsResponse } from 'src/app/services/product.module';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productsResponse: FetchedProductsResponse | undefined = undefined;
  getImageUrls(images: { id: string; propertyId: string; imageUrl: string }[]) {
    return images.map((img) => img.imageUrl);
  }
  object = {
    id: '5b740225-29c2-48d6-90a1-1fb6ef247334',
    name: 'Demo property',
    tagline: 'city of london',
    price: 123,
    country: 'CA',
    latLng: '{"lat":42.9825319,"lng":-81.25423669999999}',
    amenities: [
      {
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        amenitiesId: '107',
      },
      {
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        amenitiesId: '108',
      },
      {
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        amenitiesId: '110',
      },
      {
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        amenitiesId: '113',
      },
      {
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        amenitiesId: '114',
      },
      {
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        amenitiesId: '119',
      },
    ],
    image: [
      {
        id: '585298e7-68ac-48ce-b759-bfa8ee78ab2e',
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        imageUrl:
          'https://res.cloudinary.com/dudordakm/image/upload/v1740153172/Airbnb/skkztwyg6fekjpgyseug.jpg',
      },
      {
        id: '6dcadb8c-79cf-4eb5-b730-3096f2087a9d',
        propertyId: '5b740225-29c2-48d6-90a1-1fb6ef247334',
        imageUrl:
          'https://res.cloudinary.com/dudordakm/image/upload/v1740153172/Airbnb/jmvgdri2d5mfki1m3dvw.jpg',
      },
    ],
  };

  constructor(public productService: ProductService) {
    this.productService.fetchProducts().subscribe({
      next: (data) => {
        console.log('products: ', data);
        this.productsResponse = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
