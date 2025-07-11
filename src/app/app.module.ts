import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { NavItemComponent } from './components/header/nav-item/nav-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/products/product-card/product-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginationComponent } from './components/products/pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HeaderComponent,
    MatIconModule,
    NavItemComponent,
    HttpClientModule,
    ProductCardComponent,
    FooterComponent,
    PaginationComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
