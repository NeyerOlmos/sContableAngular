import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlanDeCuentas } from 'src/app/models/plan-de-cuentas';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CuentaService } from './cuenta.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanDeCuentasService {

  private _planDeCuentas = new BehaviorSubject<PlanDeCuentas[]>([]);
  private dataStore: { planDeCuentas: PlanDeCuentas[] } = { planDeCuentas: [] };
  private apiUrl = environment.WebApiUrl;
  readonly PlanDeCuentasList$ = this._planDeCuentas.asObservable();
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  //      'Authorization': 'my-auth-token'
      })
    };
  constructor(private http: HttpClient, private router: Router, private cuentasService: CuentaService) { }

  get planDeCuentasList(){
    return this._planDeCuentas.asObservable();
  }
  load(id: number | string) {
    this.http.get<PlanDeCuentas>(`${this.apiUrl}/api/plan_cuenta/${id}`).subscribe(planDeCuenta => {
      let notFound = true;

      this.dataStore.planDeCuentas.forEach((item, index) => {
        if (item.Cod === planDeCuenta.Cod) {
          this.dataStore.planDeCuentas[index] = planDeCuenta;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.planDeCuentas.push(planDeCuenta);
      }

      this._planDeCuentas.next(Object.assign({}, this.dataStore).planDeCuentas);
    }, error => console.log('Could not load user.'));
  }
  loadAll() {
    this.http.get<PlanDeCuentas[]>(`${this.apiUrl}/api/plan_cuenta`).subscribe(planDeCuentas => {
      this.dataStore.planDeCuentas = planDeCuentas;
      this._planDeCuentas.next(Object.assign({}, this.dataStore).planDeCuentas);
    }, error => console.log('Could not load users.'));
  }
  create(planDeCuentas: PlanDeCuentas) {
    this.http.post<PlanDeCuentas>(`${this.apiUrl}/api/plan_cuenta`, planDeCuentas).subscribe(planDeCuenta => {
        this.dataStore.planDeCuentas.push(planDeCuenta);
        this._planDeCuentas.next(Object.assign({}, this.dataStore).planDeCuentas);
        this.router.navigate(['/PlanDeCuentas/List/' + planDeCuenta.Cod]);

      }, error => console.log('Could not create todo.'));
  }

  update(planDeCuenta: PlanDeCuentas) {
    this.http.put<PlanDeCuentas>(`${this.apiUrl}/api/plan_cuenta/${planDeCuenta.Cod}`, planDeCuenta)
      .subscribe(planDeCuenta => {
        this.dataStore.planDeCuentas.forEach((t, i) => {
          if (t.Cod === planDeCuenta.Cod) { this.dataStore.planDeCuentas[i] = planDeCuenta; }
        });

        this._planDeCuentas.next(Object.assign({}, this.dataStore).planDeCuentas);
      }, error => console.log('Could not update user.'));
  }

  remove(planDeCuentaCod: number | string) {
    this.http.delete(`${this.apiUrl}/api/plan_cuenta/${planDeCuentaCod}`).subscribe(response => {
      this.dataStore.planDeCuentas.forEach((t, i) => {
        if (t.Cod === planDeCuentaCod) { this.dataStore.planDeCuentas.splice(i, 1); }
      });

      this._planDeCuentas.next(Object.assign({}, this.dataStore).planDeCuentas);
    }, error => console.log('Could not delete user.'));
  }


   dataMapPlanDeCuentas = new Map<string, string[]>();
   rootLevelNodes: string[] = [];
  getPlanDeCuentas(planDeCuenta: PlanDeCuentas) {
    console.log("se ejecuta :V")
    const cuentas = this.cuentasService.getCuentasByPlanDeCuentas(planDeCuenta);
    //cuentas.subscribe(c=>console.log(c))
    var dataMapPlanDeCuentas =  cuentas.pipe(
      map(cuentas=>{
       // console.log("cuentas")
       // console.log(cuentas)
        var dataMapPlanDeCuentas2 = new Map<string, string[]>();
        cuentas.forEach(cuenta=>
        { var cuentasChildrensInArrayString : string[]=[];
          this.cuentasService.getChildren(of(cuentas),cuenta.nombre).subscribe(cuentas=>{
          cuentasChildrensInArrayString = this.cuentasService.getCuentasToArrayString(cuentas);
        })
          dataMapPlanDeCuentas2.set(cuenta.nombre,cuentasChildrensInArrayString)
      }
      )
        return dataMapPlanDeCuentas2;
    })

    )

    return dataMapPlanDeCuentas;
  }
  getPlanDeCuentasFinal(planDeCuenta: PlanDeCuentas){
      this.getPlanDeCuentas(planDeCuenta).subscribe(c=>{
        this.dataMapPlanDeCuentas=c;
      })
      return this.dataMapPlanDeCuentas;
  }
  getRootNodesByPlanDeCuentasFinal(planDeCuenta: PlanDeCuentas){
    this.getRootNodesByPlanDeCuentas(planDeCuenta).subscribe(c=>{
      this.rootLevelNodes= c
    })
    return this.rootLevelNodes;
  }
  getRootNodesByPlanDeCuentas(planDeCuenta: PlanDeCuentas) {
    const cuentas = this.cuentasService.getCuentasByPlanDeCuentas(planDeCuenta);
    
    const rootCuentas = cuentas.pipe(
      map(_cuentas => {
      return this.cuentasService.getCuentasByLevel(_cuentas, 1);
       }),
      map(c => {
        const rootLevelNodes: string[] = [];
        c.forEach( c => rootLevelNodes.push(c.nombre))
        return rootLevelNodes;
      }));

    return rootCuentas;
  }
  



}
