import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrosRoutingModule } from './libros-routing.module';
import { LibroDiarioComponent } from './libro-diario/libro-diario.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [LibroDiarioComponent],
  imports: [
    CommonModule,
    LibrosRoutingModule,
    SharedModule
  ]
})
export class LibrosModule { }
