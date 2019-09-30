import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'LogIn', component: SignInComponent},
  {path: 'SignUp', component: SignUpComponent},
  {path: 'Home', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
