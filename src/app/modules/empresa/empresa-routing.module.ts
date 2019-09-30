import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaListComponent } from './empresa/empresa-list/empresa-list.component';
import { AddEmpresaComponent } from './empresa/add-empresa/add-empresa.component';
import { EditEmpresaComponent } from './empresa/edit-empresa/edit-empresa.component';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { DetailsEmpresaComponent } from './empresa/details-empresa/details-empresa.component';


const routes: Routes = [
  {path: 'List', component: EmpresaListComponent },
  {path: 'Add', component: AddEmpresaComponent },
  {path: 'Edit/:empresaId', component: EditEmpresaComponent },
  {path: 'Departamento/List', component: DepartamentoListComponent },
  {path: 'Details/:empresaId', component: DetailsEmpresaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
