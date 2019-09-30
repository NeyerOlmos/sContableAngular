import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UsersService } from '../users.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList$: Observable<User[]> ;
  // tslint:disable-next-line: max-line-length
  constructor( private usersService: UsersService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.userList$ = this.usersService.userList;
    this.usersService.loadAll();
  }

  goToDetails(Id: string) {
    this.router.navigate(['/Users/Details/' + Id]);
  }
  goToEditUser(Id: string) {
    this.router.navigate(['/Users/Edit/' + Id]);
  }
  goToAddUser(){
    this.router.navigate(['/Users/Add']);
  }
  deleteUser(Id: string) {
    this.usersService.remove(Id);
  }
}
