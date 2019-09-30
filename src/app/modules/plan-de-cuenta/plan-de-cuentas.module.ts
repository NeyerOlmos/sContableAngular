import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanDeCuentasRoutingModule } from './plan-de-cuentas-routing.module';
import { AddCuentaComponent } from './cuentas/add-cuenta/add-cuenta.component';
import { AddPlanDeCuentaComponent } from './plan-de-cuentas/add-plan-de-cuenta/add-plan-de-cuenta.component';
import { PlanDeCuentaListComponent } from './plan-de-cuentas/plan-de-cuenta-list/plan-de-cuenta-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CuentasListComponent } from './cuentas/cuentas-list/cuentas-list.component';
import { EditPlanDeCuentaComponent } from './plan-de-cuentas/edit-plan-de-cuenta/edit-plan-de-cuenta.component';


@NgModule({
  declarations: [AddCuentaComponent, AddPlanDeCuentaComponent, PlanDeCuentaListComponent, CuentasListComponent, EditPlanDeCuentaComponent],
  imports: [
    CommonModule,
    PlanDeCuentasRoutingModule,
    SharedModule
  ]
})
export class PlanDeCuentasModule { }
