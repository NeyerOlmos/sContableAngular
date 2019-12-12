import { Injectable } from '@angular/core';
import { CuentaService } from '../plan-de-cuenta/cuenta.service';
import { Comprobante } from 'src/app/models/comprobante';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AsientoContableExtended } from 'src/app/modules/asientos-contables/asiento-contable-extended';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  private apiUrl = environment.WebApiUrl;
  constructor(private cuentasService: CuentaService, private http: HttpClient) { }
  
  ObtenerMovimientos(){
    
  }
  CrearMovimiento(fecha:Date){
   let cbte = new Comprobante();
   cbte.fecha = fecha;
   cbte.descripcion = "";
   cbte.concepto = "1.";
   cbte.estado = "aceptado";
   cbte.creditos =100;
   cbte.debitos = null;
    
  }
  GetAsientos(){
   return this.http.get<AsientoContableExtended[]>(this.apiUrl+"/api/AsientoContableExtended");
  }
}
