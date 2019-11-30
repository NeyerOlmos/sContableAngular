import { EmpresaService } from '../../empresa/empresa.service';
import {Component, Inject,OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CuentaContable } from 'src/app/models/cuenta-contable';
import { Observable } from 'rxjs';
import { CuentaService } from '../../plan-de-cuenta/cuenta.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent implements OnInit {
  animal: string;
  name: string;
  
  isLinear = false;
  cuentasActivo: Observable<CuentaContable>;
  cuentasPasivo: Observable<CuentaContable>;

  constructor(public dialog: MatDialog,private _formBuilder: FormBuilder, private cuentasService: CuentaService) { }

  ngOnInit() {
    this.cuentasService.loadAll();
    this.cuentasService.getCuentasPasivo()
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl:'dialogAddAsiento.html', 
})
export class DialogOverviewExampleDialog {
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  
}
