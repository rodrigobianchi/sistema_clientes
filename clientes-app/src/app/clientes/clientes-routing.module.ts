import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBaseComponent } from '../app-base/app-base.component';
import { AuthGuard } from '../auth.guard';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';


const routes: Routes = [
  {
    path: 'clientes', component: AppBaseComponent, canActivate: [AuthGuard], children:
      [
        {
          path: '', redirectTo: '/clientes/list', pathMatch: 'full'
        },
        {
          path: 'form', component: ClientesFormComponent,
        },
        {
          path: 'list', component: ClientesListComponent
        },
        {
          path: 'form/:id', component: ClientesFormComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
