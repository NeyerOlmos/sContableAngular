import { Component, OnInit } from '@angular/core';
import { AsientoContable } from 'src/app/models/asiento-contable';
import { CuentaService } from '../../plan-de-cuenta/cuenta.service';
import { CuentaContable } from 'src/app/models/cuenta-contable';
import { Observable, of } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AsientosService } from '../asientos.service';
import { PlanDeCuentasService } from '../../plan-de-cuenta/plan-de-cuentas.service';
import { startWith, map } from 'rxjs/operators';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-asiento',
  templateUrl: './add-asiento.component.html',
  styleUrls: ['./add-asiento.component.css']
})
export class AddAsientoComponent 
extends BaseFormComponent
implements OnInit {
asiento = new AsientoContable();

constructor(private notificationService: NotificationService, private planDeCuentaService: PlanDeCuentasService, private cuentasService: CuentaService, private fb: FormBuilder, private asientoService: AsientosService) {
  super();
}
 myControl = new FormControl();
 options: string[] ;
 filteredOptions: Observable<string[]>;

typeAsientos = [{value: 1, viewValue: 'Simple'},{value:2, viewValue:'Compuesto'}];
cuentas$ : Observable<CuentaContable[]>;
cuentas:CuentaContable[];
selectedTypeAsientoValue : number ;
selectedCuentaIngresoValue : number ;
asientoForm: FormGroup;
movimientos: FormArray;

//isAsientoApertura:false;
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
    nroAsiento: '',
    fecha: '',
    descripcion: '',
    isAsientoApertura: false,
    movimientos: this.fb.array([ this.createItem() ])
  });


  this.planDeCuentaService.loadAll();
  this.planDeCuentaService.getPlanDeCuentaByIdEmpresa(1).subscribe(
    (c)=>{
    this.cuentasService.getCuentasByPlanDeCuentas(c).subscribe(
        (c)=>{
        this.options = this.cuentasService.getCuentasToArrayStringWithOutCodes(c);
         this.filteredOptions = this.getFormControl(0).valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
      ) 
    }
  )
 // this.onValueChanges();
}
onValueChanges(): void {
  this.asientoForm.get('cuentaId').valueChanges.subscribe(val=>{
    console.log(val);
  });
}
changeInput(){
  console.log("changeInput")
}
getFormControl(i){
 // console.log(i);
  let control = this.movimmientos.controls[i].get("cuentaId") as FormControl;
  if(i!=0){

    this.filteredOptions = control.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
    );
  }
  
 return control;
}
public valueChange()
{
   console.log(this.movimmientos.controls[0].get("cuentaId").value); // mymodel has the value before the change
}
private _filter(value): string[] {
  const filterValue = value.toLowerCase();
  console.log(filterValue)
    
    //console.log(this.options.filter(option => option.toLowerCase().includes(filterValue)))
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  
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
  this.blockView()
  // TODO: Use EventEmitter with form value
  console.warn(this.asientoForm.value);
  this.asientoService.addAsiento(this.asientoForm.value).subscribe((val)=>{
    console.log(val)
      console.log("añadido")
    this.asientoForm = this.fb.group({
      nroAsiento: '',
      fecha: '',
      descripcion: '',
      movimientos: this.fb.array([ this.createItem() ])
    });     

    this.unblockView();
    this.notificationService.message("Se guardo el asiento correctamente",":)")
  }, err => {
    this.unblockView();
    this.notificationService.message("ERROR" + err ,":(")
    console.log('HTTP Error', err)
},
  )
}



save(selectedValue: number){
    this.asiento.id_Comprobante = selectedValue;
    
    
    this.cuentasService.addAsientoContable(this.asiento).subscribe(a=>{
      console.log(a);
    })
    console.log(selectedValue)
  }
}
