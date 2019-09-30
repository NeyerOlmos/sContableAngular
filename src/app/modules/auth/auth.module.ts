import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin/admin.guard';
import { NotificationService } from 'src/app/shared/notification.service';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AdminGuard,
    NotificationService
  ]
})
export class AuthModule { }
