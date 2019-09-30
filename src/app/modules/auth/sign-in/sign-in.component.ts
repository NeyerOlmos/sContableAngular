import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent
extends BaseFormComponent
implements OnInit {
  username: string;
  password: string;
  constructor(private authService: AuthService,
              private router: Router, private notificationService: NotificationService ) {
    super();
  }

  ngOnInit() {
  }

  logIn() {
    this.blockView();
    this.authService.LogIn(this.username, this.password).then(() => {
      this.unblockView();
      this.router.navigate(['/Users/List']);
    }).catch((err) => {
       console.log(err);
       this.unblockView();
       this.notificationService.message('error', 'ok');
       });
}
  cancel() {
    console.log(this.authService.isLoggedIn());
  }
}
