import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  user$: Observable<User>;
  constructor(private usersService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('userId') ;
    this.user$ = this.usersService.getUser(id);
  }

}
