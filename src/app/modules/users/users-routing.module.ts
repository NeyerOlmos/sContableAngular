import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AdminGuard } from '../auth/admin/admin.guard';
import { DetailsUserComponent } from './details-user/details-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';


const routes: Routes = [
  {path: 'List', component: UserListComponent, canActivate: [AdminGuard]},
  {path: 'Add', component: AddUserComponent, canActivate: [AdminGuard]},
  {path: 'Details/:userId', component: DetailsUserComponent, canActivate: [AdminGuard]},
  {path: 'Edit/:userId', component: EditUserComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
