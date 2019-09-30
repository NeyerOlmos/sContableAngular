import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users = new BehaviorSubject<User[]>([]);
  private dataStore: { users: User[] } = { users: [] };
  private apiUrl = environment.WebApiUrl;
  readonly UserList$ = this._users. asObservable();
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  //      'Authorization': 'my-auth-token'
      })
    };
  

  constructor(private http: HttpClient, private router : Router ) { }

    get userList(){
      return this._users.asObservable();
    }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/api/Users/' + id);
  }
  updateObsolete(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + '/api/Users/' + user.Id , user, this.httpOptions);
  }
  delete(id: string): Promise<User> {
    return this.http.delete<User>(this.apiUrl + '/api/Users/' + id, this.httpOptions).toPromise();
  }
  addUser(user: User){
    user.Password = '123456';
    user.CofirmPassword = '123456';
    return this.http.post(this.apiUrl + '/api/Users', user, this.httpOptions).toPromise();
  }

  load(id: number | string) {
    this.http.get<User>(`${this.apiUrl}/api/Users/${id}`).subscribe(user => {
      let notFound = true;

      this.dataStore.users.forEach((item, index) => {
        if (item.Id === user.Id) {
          this.dataStore.users[index] = user;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.users.push(user);
      }

      this._users.next(Object.assign({}, this.dataStore).users);
    }, error => console.log('Could not load user.'));
  }
  loadAll() {
    this.http.get<User[]>(`${this.apiUrl}/api/Users`).subscribe(users => {
      this.dataStore.users = users;
      this._users.next(Object.assign({}, this.dataStore).users);
    }, error => console.log('Could not load users.'));
  }

  create(user: User) {
    this.http.post<User>(`${this.apiUrl}/api/Users`, user).subscribe(data => {
        this.dataStore.users.push(data);
        this._users.next(Object.assign({}, this.dataStore).users);
        this.router.navigate(['/Users/Details/' + user.Id]);

      }, error => console.log('Could not create todo.'));
  }

  update(user: User) {
    this.http.put<User>(`${this.apiUrl}/api/Users/${user.Id}`, user)
      .subscribe(data => {
        this.dataStore.users.forEach((t, i) => {
          if (t.Id === data.Id) { this.dataStore.users[i] = data; }
        });

        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => console.log('Could not update user.'));
  }

  remove(userId: number | string) {
    this.http.delete(`${this.apiUrl}/api/Users/${userId}`).subscribe(response => {
      this.dataStore.users.forEach((t, i) => {
        if (t.Id === userId) { this.dataStore.users.splice(i, 1); }
      });

      this._users.next(Object.assign({}, this.dataStore).users);
    }, error => console.log('Could not delete user.'));
  }
}
