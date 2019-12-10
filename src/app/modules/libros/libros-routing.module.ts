import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibroDiarioComponent } from './libro-diario/libro-diario.component';
import { AdminGuard } from '../auth/admin/admin.guard';


const routes: Routes = [
  {path: 'Diario', component: LibroDiarioComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrosRoutingModule { }
