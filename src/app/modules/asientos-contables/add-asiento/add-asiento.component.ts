import { Component, OnInit } from '@angular/core';
import { AsientoContable } from 'src/app/models/asiento-contable';
import { CuentaService } from '../../plan-de-cuenta/cuenta.service';
import { CuentaContable } from 'src/app/models/cuenta-contable';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-asiento',
  templateUrl: './add-asiento.component.html',
  styleUrls: ['./add-asiento.component.css']
})
export class AddAsientoComponent implements OnInit {
asiento = new AsientoContable();

constructor(private cuentasService: CuentaService, private fb: FormBuilder) {
  
 }
typeAsientos = [{value: 1, viewValue: 'Simple'},{value:2, viewValue:'Compuesto'}];
cuentas$ : Observable<CuentaContable[]>;
cuentas:CuentaContable[];
selectedTypeAsientoValue : number ;
selectedCuentaIngresoValue : number ;
asientoForm: FormGroup;
movimientos: FormArray;
/**
 * 
 asientoForm = this.fb.group({
  nroFolio:[''],
  descripcion:[''],
  movimientos: this.fb.array([this.fb.control('')])
})
 */
tipoMovimientos: string[] = ['Debe', 'Haber'];

ngOnInit() {
  this.cuentas$ = this.cuentasService.cuentasList;
  this.cuentasService.loadAll();
  this.cuentas$.subscribe(c=>this.cuentas=c);
  this.asientoForm = this.fb.group({
    nroFolio: '',
    fecha: '',
    descripcion: '',
    movimientos: this.fb.array([ this.createItem() ])
  });
}
createItem(): FormGroup {
  return this.fb.group({
    cuentaId: '',
    description: '',
    monto: '',
    tipoMovimiento:''
  });
}
addItem(): void {
  this.movimientos = this.asientoForm.get('movimientos') as FormArray;
  
  this.movimientos.push(this.createItem());
}
get movimmientos(){
  return this.asientoForm.get('movimientos') as FormArray;
}
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.asientoForm.value);
}



save(selectedValue: number){
    this.asiento.id_Comprobante = selectedValue;
    
    
    this.cuentasService.addAsientoContable(this.asiento).subscribe(a=>{
      console.log(a);
    })
    console.log(selectedValue)
  }
}
