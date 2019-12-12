import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { CuentaService } from '../plan-de-cuenta/cuenta.service';
import { AsientoContableExtended } from './../../models/asiento-contable-extended';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {
  private apiUrl = environment.WebApiUrl;
  constructor(private http: HttpClient, private cuentaService: CuentaService) { }
  addAsiento(asiento: AsientoContableExtended){
    let debitos:number = 0;
    let creditos:number = 0;
    asiento.movimientos.forEach(movimiento=>{
      if(movimiento.tipoMovimiento=="Debe"){
        debitos = debitos + +movimiento.monto;
      }else{
        creditos = creditos + +movimiento.monto;
      }
    })
    asiento.debitos = debitos.toString();
    asiento.creditos = creditos.toString();
    if(asiento.debitos==asiento.creditos){
      console.log("cuadran")
      return this.http.post<AsientoContableExtended>(this.apiUrl+"/api/AsientoContableExtended", asiento);
    }else{
      console.log("no cuadran")
      return throwError("El asiento no cuadra el debe y el haber");
    }

  }
}

