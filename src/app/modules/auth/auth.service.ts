import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiUrl = environment.WebApiUrl;
  private isLogged = new BehaviorSubject<boolean>(false);
  private _isLogged: boolean;
  constructor(private http: HttpClient, private router: Router) {
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }
   SignIn(username: string, password: string) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True'});
    console.log(this.apiUrl)
    return this.http.post(this.apiUrl + '/Token' , data , {headers: reqHeader} ).toPromise();
  }
  isLoggedIn(){
    const token = sessionStorage.getItem('token');
    if (token !== null) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
    return this.isLogged.asObservable();
  }
  LogOut() {
    sessionStorage.removeItem('token');
    this.isLogged.next(false);
  }
  LogIn(username: string, password: string) {
    return Promise.resolve(this.SignIn(username , password)).then((values) => {
        sessionStorage.setItem('token', values['access_token'])
        this.isLogged.next(true);
    });
  }
}
