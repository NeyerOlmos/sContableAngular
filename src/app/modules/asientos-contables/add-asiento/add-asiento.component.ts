import { Component, OnInit } from '@angular/core';
import { AsientoContable } from 'src/app/models/asiento-contable';
import { CuentaService } from '../../plan-de-cuenta/cuenta.service';
import { CuentaContable } from 'src/app/models/cuenta-contable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-asiento',
  templateUrl: './add-asiento.component.html',
  styleUrls: ['./add-asiento.component.css']
})
export class AddAsientoComponent implements OnInit {
asiento = new AsientoContable();
  constructor(private cuentasService: CuentaService) { }
  typeAsientos = [{value: 1, viewValue: 'Ingreso'},{value:2, viewValue:'Egreso'}, {value: 3, viewValue:'Traspaso'}];
  cuentas$ : Observable<CuentaContable[]>;
  private selectedTypeAsientoValue : number ;
  private selectedCuentaIngresoValue : number ;
  ngOnInit() {
    this.cuentas$ = this.cuentasService.cuentasList;
    this.cuentasService.loadAll();

  }

  save(selectedValue: number){
    this.asiento.id_Comprobante = selectedValue;
    
    
    this.cuentasService.addAsientoContable(this.asiento).subscribe(a=>{
      console.log(a);
    })
    console.log(selectedValue)
  }
}
