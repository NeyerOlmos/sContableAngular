import { Injectable } from '@angular/core';
import { BehaviorSubject, pipe, Observable, of } from 'rxjs';
import { CuentaContable } from 'src/app/models/cuenta-contable';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, mapTo } from 'rxjs/operators';
import { PlanDeCuentas } from 'src/app/models/plan-de-cuentas';
import { AsientoContable } from 'src/app/models/asiento-contable';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private _cuentas = new BehaviorSubject<CuentaContable[]>([]);
  private dataStore: { cuentas: CuentaContable[] } = { cuentas: [] };
  private apiUrl = environment.WebApiUrl;
  readonly CuentasList$ = this._cuentas.asObservable();
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
  //      'Authorization': 'my-auth-token'
      })
    };
  constructor(private http: HttpClient, private router: Router) { this.loadAll() }

  get cuentasList() {
    return this._cuentas.asObservable();
  }
  getLevel(cuenta: CuentaContable): number {
    const cods = cuenta.Cod.split('.');
    return cods.length - 1 ;
  }
  getCuentasByPlanDeCuentas(planDeCuentas: PlanDeCuentas){
      return this._cuentas.asObservable().pipe(map(cuentas=> {
        return cuentas.filter(cuenta=>cuenta.id_PlanDeCuentas=planDeCuentas.Cod );
      }))
  }
  getCuentasByLevel(cuentas: CuentaContable[], level: number) {
    return cuentas.filter(cuenta => this.getLevel(cuenta) === level );
  }
  getMaxLevel(idPlanDeCuentas: number) {
    const maxLevel = this._cuentas.asObservable().pipe(
      map(cuentas => cuentas.filter(cuenta => cuenta.id_PlanDeCuentas === idPlanDeCuentas)),
      map(cuentas => {
        let levelMax = 0;
        cuentas.forEach(cuenta => {
          if (this.getLevel(cuenta) > levelMax ) {
            levelMax = this.getLevel(cuenta);
          }
      });
        return levelMax;
      }  )

      );
    return maxLevel;
  }
  addAsientoContable(asiento: AsientoContable){
    return this.http.post(this.apiUrl+"/api/asiento_contable",asiento);
  }
  getDirectChildrenByCod(cuentas: CuentaContable[], cod: string) {

     const _cuentas = of(cuentas);
     const cuentaLevel = _cuentas.pipe(
       map(cuentas => cuentas.find(c => c.Cod === cod)),
       map(cuenta => this.getLevel(cuenta) ),
       map(level=>this.getCuentasByLevel(cuentas, level + 1))
       );
       //return cuentaLevel
    }

      getChildren(cuentas: Observable<CuentaContable[]>, nombre: string) {
      //const cuentas = this._cuentas.asObservable();

      const children = cuentas.pipe(
        map(cuentas => {
          
         return cuentas.find(cuenta => cuenta.nombre === nombre);
        }),
        map(cuenta => cuenta.id),
        map(id => this.getChildrenById(cuentas,id) )
      );
      return children;
    }

    getChildrenById(cuentas: Observable<CuentaContable[]>, id: number) {
     // const cuentas = this._cuentas.asObservable();
     var cuentasContables: CuentaContable[]= [];
     const children = cuentas.pipe(map(cuentas => {
        return cuentas.filter(cuenta => cuenta.cta_padre === id);
      }));

     children.subscribe(cuentasChildren=> {
        cuentasContables = cuentasChildren;
      })

     return cuentasContables;
    }
  getCuentasToArrayString(cuentas: CuentaContable[]){
    const _cuentas: string[]=[];
    cuentas.forEach(cuenta=>{
        _cuentas.push(cuenta.Cod + " " + cuenta.nombre);
    })
    return _cuentas;
  }
  getCuentasToArrayStringWithOutCodes(cuentas: CuentaContable[]){
    const _cuentas: string[]=[];
    cuentas.forEach(cuenta=>{
        _cuentas.push(cuenta.nombre);
    })
    return _cuentas;
  }
  getCuentaByName(name: string){
   var cuenta: CuentaContable;
   this.cuentasList.subscribe(c=>{
    cuenta =  c.find(_c=>_c.nombre==name)
    })
   return cuenta;
  }
  getCod(cuentaPadre: CuentaContable ){
    if(cuentaPadre){
      var cuentas = this.getChildrenById(this.cuentasList,cuentaPadre.id)
      if(cuentas.length > 0){
     var lastCuentaChild = cuentas[cuentas.length - 1];
     var codLastCuenta = lastCuentaChild.Cod;
     var numbers=codLastCuenta.split(".");
     var num = +numbers[numbers.length - 2 ];
     numbers[numbers.length - 2] = (num + 1).toString();
    return numbers.join(".");
    }else{
     return cuentaPadre.Cod + "1.";
    }
  }else{
    var result :string;
    this.cuentasList.subscribe(c=>{
      var cuentasLevel1 = this.getCuentasByLevel(c,1); 
      if(cuentasLevel1.length>0){

        var LastCuentaLevel1 =  cuentasLevel1[cuentasLevel1.length - 1];
        var codLastCuentaLevel1 =LastCuentaLevel1.Cod;
        var numbersLevel1= codLastCuentaLevel1.split(".");
        var numLevel1= +numbersLevel1[numbersLevel1.length - 2];
        numbersLevel1[numbersLevel1.length - 2] = (numLevel1 + 1).toString();
      result = numbersLevel1.join(".");
    }else{
      result = "1.";
    }
    })
    return result;
  }
  }
  getCuentasActivo(){

  }
  getCuentasPasivo(){
    
  }
  
  load(id: number | string) {
    this.http.get<CuentaContable>(`${this.apiUrl}/api/cuentas/${id}`).subscribe(cuenta => {
      let notFound = true;

      this.dataStore.cuentas.forEach((item, index) => {
        if (item.id === cuenta.id) {
          this.dataStore.cuentas[index] = cuenta;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.cuentas.push(cuenta);
      }

      this._cuentas.next(Object.assign({}, this.dataStore).cuentas);
    }, error => console.log('Could not load user.'));
  }
  loadAll() {
    this.http.get<CuentaContable[]>(`${this.apiUrl}/api/cuentas`).subscribe(cuentas => {
      this.dataStore.cuentas = cuentas;
      this._cuentas.next(Object.assign({}, this.dataStore).cuentas);
    }, error => console.log('Could not load users.'));
  }
  create(cuenta: CuentaContable) {
    this.http.post<CuentaContable>(`${this.apiUrl}/api/cuentas`, cuenta).subscribe( cuenta => {
        this.dataStore.cuentas.push(cuenta);
        this._cuentas.next(Object.assign({}, this.dataStore).cuentas);
       // this.router.navigate(['/Cuentas/Details/' + cuenta.id]);

      }, error => console.log('Could not create todo.'));
  }

  update(cuenta: CuentaContable) {
    this.http.put<CuentaContable>(`${this.apiUrl}/api/cuentas/${cuenta.id}`, cuenta)
      .subscribe(cuenta => {
        this.dataStore.cuentas.forEach((t, i) => {
          if (t.id === cuenta.id) { this.dataStore.cuentas[i] = cuenta; }
        });

        this._cuentas.next(Object.assign({}, this.dataStore).cuentas);
      }, error => console.log('Could not update user.'));
  }

  remove(cuentaId: number | string) {
    this.http.delete(`${this.apiUrl}/api/cuentas/${cuentaId}`).subscribe(response => {
      this.dataStore.cuentas.forEach((t, i) => {
        if (t.id === cuentaId) { this.dataStore.cuentas.splice(i, 1); }
      });

      this._cuentas.next(Object.assign({}, this.dataStore).cuentas);
    }, error => console.log('Could not delete user.'));
  }

}
