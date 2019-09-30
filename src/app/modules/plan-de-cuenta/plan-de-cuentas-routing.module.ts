import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlanDeCuentaComponent } from './plan-de-cuentas/add-plan-de-cuenta/add-plan-de-cuenta.component';
import { AdminGuard } from '../auth/admin/admin.guard';
import { PlanDeCuentaListComponent } from './plan-de-cuentas/plan-de-cuenta-list/plan-de-cuenta-list.component';
import { AddCuentaComponent } from './cuentas/add-cuenta/add-cuenta.component';
import { CuentasListComponent } from './cuentas/cuentas-list/cuentas-list.component';
import { EditPlanDeCuentaComponent } from './plan-de-cuentas/edit-plan-de-cuenta/edit-plan-de-cuenta.component';


const routes: Routes = [
  {path: 'List', component: PlanDeCuentaListComponent, canActivate: [AdminGuard]},
  {path: 'Add', component: AddPlanDeCuentaComponent, canActivate: [AdminGuard]},
  // {path: 'Details/:userId', component: DetailsUserComponent, canActivate: [AdminGuard]},
  {path: 'Edit/:userId', component: EditPlanDeCuentaComponent, canActivate: [AdminGuard]},
  {path: 'AddCuentaContable', component: AddCuentaComponent, canActivate: [AdminGuard]},
  {path: 'Cuentas', component: CuentasListComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanDeCuentasRoutingModule { }
