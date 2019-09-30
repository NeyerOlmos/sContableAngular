import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departamento } from 'src/app/models/departamento';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private _departamentos = new BehaviorSubject<Departamento[]>([]);
  private dataStore: { departamentos: Departamento[] } = { departamentos: [] };
  private apiUrl = environment.WebApiUrl;
  readonly DepartamentoList$ = this._departamentos.asObservable();
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  //      'Authorization': 'my-auth-token'
      })
    };
  

  constructor(private http: HttpClient, private router : Router ) { }

    get departamentoList(){
      return this._departamentos.asObservable();
    }
   departamentoListByEmpresaId(id: string | number){
    const departamentos= this._departamentos.asObservable();
    const departamentosByIdEmpresa=departamentos.pipe(
      map( results => results.filter(r => r.id_empresa === id) )
    );
    return departamentosByIdEmpresa;

  }
  getUser(id: string): Observable<Departamento> {
    return this.http.get<Departamento>(this.apiUrl + '/api/Departamentos/' + id);
  }

  load(id: number | string) {
    this.http.get<Departamento>(`${this.apiUrl}/api/Departamentos/${id}`).subscribe(departamento => {
      let notFound = true;

      this.dataStore.departamentos.forEach((item, index) => {
        if (item.Cod === departamento.Cod) {
          this.dataStore.departamentos[index] = departamento;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.departamentos.push(departamento);
      }

      this._departamentos.next(Object.assign({}, this.dataStore).departamentos);
    }, error => console.log('Could not load departamento.'));
  }
  loadAll() {
    this.http.get<Departamento[]>(`${this.apiUrl}/api/Departamentos`).subscribe(departamentos => {
      this.dataStore.departamentos = departamentos;
      this._departamentos.next(Object.assign({}, this.dataStore).departamentos);
    }, error => console.log('Could not load departamentos.'));
  }

  create(departamento: Departamento) {
    this.http.post<Departamento>(`${this.apiUrl}/api/Departamentos`, departamento).subscribe( departamento => {
        this.dataStore.departamentos.push(departamento);
        this._departamentos.next(Object.assign({}, this.dataStore).departamentos);
        //this.router.navigate(['/Departamento/Details/' + departamento.Cod]);
        this.loadAll();
      }, error => console.log('Could not create todo.'));
  }

  update(departamento: Departamento) {
    this.http.put<Departamento>(`${this.apiUrl}/api/Departamentos/${departamento.Cod}`, departamento)
      .subscribe(data => {
        this.dataStore.departamentos.forEach((t, i) => {
          if (t.Cod === data.Cod) { this.dataStore.departamentos[i] = data; }
        });

        this._departamentos.next(Object.assign({}, this.dataStore).departamentos);
      }, error => console.log('Could not update departamento.'));
  }

  remove(userId: number | string) {
    this.http.delete(`${this.apiUrl}/api/Departamentos/${userId}`).subscribe(response => {
      this.dataStore.departamentos.forEach((t, i) => {
        if (t.Cod === userId) { this.dataStore.departamentos.splice(i, 1); }
      });

      this._departamentos.next(Object.assign({}, this.dataStore).departamentos);
    }, error => console.log('Could not delete departamento.'));
  }}
