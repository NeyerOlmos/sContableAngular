import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User;
  constructor(private usersService: UsersService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.user = new User();
  }
  addUser() {
    this.usersService.create(this.user);
   // .then((user: User)=>{
   //   this.notificationService.message(user.UserName + ' Added','ok');
   // })
  }
}

