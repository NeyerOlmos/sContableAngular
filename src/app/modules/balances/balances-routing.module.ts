import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceDeAperturaComponent } from './balanceDeApertura/balance-de-apertura/balance-de-apertura.component';
import { AdminGuard } from '../auth/admin/admin.guard';
import { AddBalanceComponent } from './add-balance/add-balance.component';


const routes: Routes = [
  {path:'Add', component: AddBalanceComponent, canActivate: [AdminGuard]},
  {path:'Apertura', component:BalanceDeAperturaComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalancesRoutingModule { }
