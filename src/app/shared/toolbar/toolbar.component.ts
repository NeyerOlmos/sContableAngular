import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.auth.LogOut();
    this.router.navigate(['/']);
  }
}
