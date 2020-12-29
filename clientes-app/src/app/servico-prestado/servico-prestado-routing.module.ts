import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBaseComponent } from '../app-base/app-base.component';
import { AuthGuard } from '../auth.guard';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListComponent } from './servico-prestado-list/servico-prestado-list.component';


const routes: Routes = [
  {
    path: 'servico-prestado', component: AppBaseComponent, canActivate: [AuthGuard], children:
      [
        {
          path: '', redirectTo: '/servico-prestado/list', pathMatch: 'full'
        },
        {
          path: 'form', component: ServicoPrestadoFormComponent,
        },
        {
          path: 'list', component: ServicoPrestadoListComponent
        },
        {
          path: 'form/:id', component: ServicoPrestadoFormComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule { }
