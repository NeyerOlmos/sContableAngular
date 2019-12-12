import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../libros.service';
import { AsientoContableExtended } from '../../../models/asiento-contable-extended';
import { Observable } from 'rxjs';
import { PlanDeCuentasService } from '../../plan-de-cuenta/plan-de-cuentas.service';
import { CuentaService } from '../../plan-de-cuenta/cuenta.service';

@Component({
  selector: 'app-libro-diario',
  templateUrl: './libro-diario.component.html',
  styleUrls: ['./libro-diario.component.css']
})
export class LibroDiarioComponent implements OnInit {
  asientos$: Observable<AsientoContableExtended[]>;
  constructor(private librosService : LibrosService, private cuentaService: CuentaService) { }

  ngOnInit() {
    this.asientos$ = this.librosService.GetAsientos();
  }
 getNombreDeCuenta(id : number){
  return this.cuentaService.getCuentaById(id);
}
}
