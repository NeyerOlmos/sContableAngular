import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: './modules/auth/auth.module#AuthModule'},
  {path: 'Auth', loadChildren: './modules/auth/auth.module#AuthModule'},
  {path: 'Users', loadChildren: './modules/users/users.module#UsersModule'},
  {path: 'PlanDeCuentas', loadChildren: './modules/plan-de-cuenta/plan-de-cuentas.module#PlanDeCuentasModule'},
  {path: 'Empresas', loadChildren: './modules/empresa/empresa.module#EmpresaModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
