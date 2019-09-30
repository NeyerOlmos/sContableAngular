import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { DetailsEmpresaComponent } from './empresa/details-empresa/details-empresa.component';
import { AddEmpresaComponent } from './empresa/add-empresa/add-empresa.component';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmpresaService } from './empresa.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { EditEmpresaComponent } from './empresa/edit-empresa/edit-empresa.component';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { AddDepartamentoComponent } from './departamento/add-departamento/add-departamento.component';
import { EditDepartamentoComponent } from './departamento/edit-departamento/edit-departamento.component';


@NgModule({
  declarations: [DetailsEmpresaComponent, AddEmpresaComponent, EmpresaListComponent, EditEmpresaComponent, DepartamentoListComponent, AddDepartamentoComponent, EditDepartamentoComponent],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    SharedModule
  ],
  providers: [
    EmpresaService,
    NotificationService
  ]
})
export class EmpresaModule { }
