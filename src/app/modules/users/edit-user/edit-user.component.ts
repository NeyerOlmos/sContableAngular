import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared/notification.service';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent
extends BaseFormComponent
implements OnInit {

  user$: Observable<User>;
 // user: User;
  constructor(private usersService: UsersService, private route: ActivatedRoute, private notificationService: NotificationService) {
    super();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('userId') ;
    this.user$ = this.usersService.userList.pipe(
      map(users => users.find(item => item.Id === id))
    );
    this.usersService.loadAll();
    this.usersService.load(id);
    // this.usersService.getUser(id).subscribe( user => { this.user = user; });
  }
  update(user : User) {
   // this.blockView();
    this.usersService.update(user);
    // .subscribe(val => {
    //  this.notificationService.message('Updated', 'ok');
    //  this.unblockView();
   // });
  }
}
