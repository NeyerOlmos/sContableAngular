import { Injectable } from '@angular/core';
import { CuentaService } from '../plan-de-cuenta/cuenta.service';
import { Comprobante } from 'src/app/models/comprobante';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(private cuentasService: CuentaService) { }
  
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
}
