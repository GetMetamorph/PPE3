import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';


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
    path:'home',redirectTo: 'http://localhost:8001/home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
