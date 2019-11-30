import { Component, OnInit } from '@angular/core';
import { CuentaService } from 'src/app/modules/plan-de-cuenta/cuenta.service';
import { Observable } from 'rxjs';
import { CuentaContable } from 'src/app/models/cuenta-contable';

@Component({
  selector: 'app-balance-de-apertura',
  templateUrl: './balance-de-apertura.component.html',
  styleUrls: ['./balance-de-apertura.component.css']
})
export class BalanceDeAperturaComponent implements OnInit {

  _cuentas$: Observable<CuentaContable[]>;
  _cuentasActivo: CuentaContable[];
  _cuentasPasivo: CuentaContable[];
  constructor(private cuentasService: CuentaService) { }

  ngOnInit() {
    this._cuentas$= this.cuentasService.cuentasList;
  this.cuentasService.loadAll();
  setTimeout(()=>{

    this.getCuentasPasivas();
  },4000)
  }

  getCuentasPasivas(){
    
    this.cuentasService.getChildren(this._cuentas$,"Activo").subscribe(cuentas=>{
      console.log(cuentas)
      this._cuentasActivo = cuentas
    })
    this.cuentasService.getChildren(this._cuentas$,"Pasivo").subscribe(cuentas=>{
      console.log(cuentas)
      this._cuentasPasivo = cuentas;
    })
  }
}
