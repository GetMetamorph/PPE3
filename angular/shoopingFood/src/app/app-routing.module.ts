import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MyhomeComponent } from './pages/myhome/myhome.component';
import { RoomComponent } from './pages/room/room.component';
import { AddroomComponent } from './pages/addroom/addroom.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',redirectTo: 'login',pathMatch: 'full',
  },
  
  {
    path:'login',
    component: LoginComponent
  },

  {
    path:'register',
    component: RegisterComponent
  },

  {
    path:'home',
    component: HomeComponent
  },

  {
    path:'profile',
    component: ProfileComponent
  },

  {
    path:'edit-profile',
    component: EditProfileComponent
  },

  {
    path:'myhome',
    component: MyhomeComponent
  },
  
  {
    path:'room',
    component: RoomComponent
  },  
  
  {
    path:'addroom',
    component: AddroomComponent
  },

  {
    path:'inventory',
    component: InventoryComponent
  },

  {
    path:'product',
    component: ProductComponent
  },

  {
    path:'edit-product',
    component: ProductEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
