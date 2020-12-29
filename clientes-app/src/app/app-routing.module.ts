import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBaseComponent } from './app-base/app-base.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: AppBaseComponent, children:
      [
        {
          path: 'home', component: HomeComponent, canActivate: [AuthGuard]
        },
        {
          path: '', redirectTo: '/home', pathMatch: 'full'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
