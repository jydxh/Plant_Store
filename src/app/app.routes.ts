import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'about', redirectTo: 'about-us' },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: '**', component: PageNotFoundComponent },
];
