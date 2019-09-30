import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { UsersService } from './users.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NotificationService } from 'src/app/shared/notification.service';


@NgModule({
  declarations: [UserListComponent, AddUserComponent, DetailsUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [
    UsersService,
    NotificationService
  ]
})
export class UsersModule { }
