import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BalancesRoutingModule } from './balances-routing.module';
import { BalanceDeAperturaComponent } from './balanceDeApertura/balance-de-apertura/balance-de-apertura.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBalanceComponent, DialogOverviewExampleDialog } from './add-balance/add-balance.component';


@NgModule({
  declarations: [BalanceDeAperturaComponent, AddBalanceComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    BalancesRoutingModule,
    SharedModule
  ],entryComponents:[DialogOverviewExampleDialog]
})
export class BalancesModule { }
