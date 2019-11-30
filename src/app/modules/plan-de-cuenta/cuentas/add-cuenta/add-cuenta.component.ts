import { Component, OnInit } from '@angular/core';
import { CuentaContable } from 'src/app/models/cuenta-contable';
import { PlanDeCuentasService } from '../../plan-de-cuentas.service';
import { PlanDeCuentas } from 'src/app/models/plan-de-cuentas';
import { filter, startWith, map } from 'rxjs/operators';
import { CuentaService } from '../../cuenta.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cuenta',
  templateUrl: './add-cuenta.component.html',
  styleUrls: ['./add-cuenta.component.css']
})
export class AddCuentaComponent implements OnInit {
codigoPadre: number;
cuenta: CuentaContable = new CuentaContable();
planDeCuenta: PlanDeCuentas;

dataMap$: Observable<Map<string,string[]>>;
rootLevelNodes$: Observable<string[]>;

myControl = new FormControl();
options: string[] ;
filteredOptions: Observable<string[]>;
constructor(private planDeCuentaService: PlanDeCuentasService, private cuentaService: CuentaService,private router: Router) { }

  ngOnInit() {
    this.planDeCuentaService.loadAll();
    this.planDeCuentaService.getPlanDeCuentaByIdEmpresa(1).subscribe(
      (c)=>{
      this.planDeCuenta = c;
      this.cuentaService.getCuentasByPlanDeCuentas(this.planDeCuenta).subscribe(
          (c)=>{
          this.options = this.cuentaService.getCuentasToArrayStringWithOutCodes(c);
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value))
            );
        }
        ) 

        this.dataMap$ = this.planDeCuentaService.getPlanDeCuentas(this.planDeCuenta);
        this.rootLevelNodes$ = this.planDeCuentaService.getRootNodesByPlanDeCuentas(this.planDeCuenta);
      }
    )
    

 }
addCuentaContable(cuenta : CuentaContable) {
  cuenta.id_PlanDeCuentas = this.planDeCuenta.Cod;
  //this.cuentaService.create(cuenta);
  var cuentaPadre= this.cuentaService.getCuentaByName(this.myControl.value);
  if(cuentaPadre){
    cuenta.cta_padre = cuentaPadre.id;
  }else{
    cuenta.cta_padre = null;
  }
    
    var cod = this.cuentaService.getCod(cuentaPadre);
    cuenta.Cod = cod;
  cuenta.id_PlanDeCuentas = 1;
  cuenta.id_Moneda=2;
  this.cuentaService.create(cuenta);
  //this.planDeCuentaService.loadAll();
  
}
  getPlanDeCuentas(planDeCuenta: PlanDeCuentas){
    
    return this.planDeCuentaService.getPlanDeCuentas(planDeCuenta)
   // return this.dataMapTest2;
  }
  getRootNodesByPlanDeCuentas(planDeCuenta: PlanDeCuentas){
   return this.planDeCuentaService.getRootNodesByPlanDeCuentas(planDeCuenta)
    
 //  return this.rootLevelNodesTest2;
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
