import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
