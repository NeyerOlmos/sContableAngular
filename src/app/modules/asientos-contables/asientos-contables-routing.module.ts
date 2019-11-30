import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAsientoComponent } from './add-asiento/add-asiento.component';
import { AsientosListComponent } from './asientos-list/asientos-list.component';
import { AdminGuard } from '../auth/admin/admin.guard';


const routes: Routes = [
  {path: 'Add', component: AddAsientoComponent, canActivate: [AdminGuard]},
  {path: 'List', component: AsientosListComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsientosContablesRoutingModule { }
