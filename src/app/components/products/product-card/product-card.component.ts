import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  imports: [CurrencyPipe, CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductCardComponent {
  @Input() name!: string;
  @Input() tagline!: string;
  @Input() id!: string;
  @Input() country!: string;
  @Input() price!: number;
  @Input() imageUrls!: string[];
}
