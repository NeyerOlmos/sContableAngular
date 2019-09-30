import { Component, OnInit } from '@angular/core';
import { CuentaContable } from 'src/app/models/cuenta-contable';

@Component({
  selector: 'app-add-cuenta',
  templateUrl: './add-cuenta.component.html',
  styleUrls: ['./add-cuenta.component.css']
})
export class AddCuentaComponent implements OnInit {
codigoPadre: number;
cuenta: CuentaContable;
  constructor() { }

  ngOnInit() {
  }

}
