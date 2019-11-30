import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsientosContablesRoutingModule } from './asientos-contables-routing.module';
import { AddAsientoComponent } from './add-asiento/add-asiento.component';
import { AsientosListComponent } from './asientos-list/asientos-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AddAsientoComponent, AsientosListComponent],
  imports: [
    CommonModule,
    AsientosContablesRoutingModule,
    SharedModule
  ]
})
export class AsientosContablesModule { }
