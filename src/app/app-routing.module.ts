import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { FilterComponent } from './filter/filter.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PurchaseRequestsComponent } from './purchase-requests/purchase-requests.component';
import { ChatComponent } from './chat/chat.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user/user.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ApprovedOrdersComponent } from './approved-orders/approved-orders.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'product/:id', component: ProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'requests', component: PurchaseRequestsComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'user/:id', component: UserComponent},
  {path: 'edit-profile/:id', component: UpdateProfileComponent},
  {path: 'update-product/:id', component: UpdateProductComponent},
  {path: 'users', component: UsersListComponent},
  {path: 'approved', component: ApprovedOrdersComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'reset', component: ResetComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
