import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private _empresas = new BehaviorSubject<Empresa[]>([]);
  private dataStore: { empresas: Empresa[] } = { empresas: [] };
  private apiUrl = environment.WebApiUrl;
  readonly EmpresaList$ = this._empresas. asObservable();
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  //      'Authorization': 'my-auth-token'
      })
    };
  

  constructor(private http: HttpClient, private router : Router ) { }

    get empresaList(){
      return this._empresas.asObservable();
    }
  getUser(id: string): Observable<Empresa> {
    return this.http.get<Empresa>(this.apiUrl + '/api/Empresas/' + id);
  }

  load(id: number | string) {
    this.http.get<Empresa>(`${this.apiUrl}/api/Empresas/${id}`).subscribe(empresa => {
      let notFound = true;

      this.dataStore.empresas.forEach((item, index) => {
        if (item.Id === empresa.Id) {
          this.dataStore.empresas[index] = empresa;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.empresas.push(empresa);
      }

      this._empresas.next(Object.assign({}, this.dataStore).empresas);
    }, error => console.log('Could not load user.'));
  }
  loadAll() {
    this.http.get<Empresa[]>(`${this.apiUrl}/api/Empresas`).subscribe(empresas => {
      this.dataStore.empresas = empresas;
      this._empresas.next(Object.assign({}, this.dataStore).empresas);
    }, error => console.log('Could not load users.'));
  }

  create(empresa: Empresa) {
    this.http.post<Empresa>(`${this.apiUrl}/api/Empresas`, empresa).subscribe( empresa => {
        this.dataStore.empresas.push(empresa);
        this._empresas.next(Object.assign({}, this.dataStore).empresas);
        this.router.navigate(['/Empresas/Edit/' + empresa.Id]);

      }, error => console.log('Could not create todo.'));
  }

  update(empresa: Empresa) {
    this.http.put<Empresa>(`${this.apiUrl}/api/Empresas/${empresa.Id}`, empresa)
      .subscribe(data => {
        this.dataStore.empresas.forEach((t, i) => {
          if (t.Id === data.Id) { this.dataStore.empresas[i] = data; }
        });

        this._empresas.next(Object.assign({}, this.dataStore).empresas);
      }, error => console.log('Could not update user.'));
  }

  remove(empresaId: number | string) {
    this.http.delete(`${this.apiUrl}/api/Empresas/${empresaId}`).subscribe(response => {
      this.dataStore.empresas.forEach((t, i) => {
        if (t.Id === empresaId) { this.dataStore.empresas.splice(i, 1); }
      });

      this._empresas.next(Object.assign({}, this.dataStore).empresas);
    }, error => console.log('Could not delete user.'));
  }
}
