import { Injectable } from '@angular/core';
import { PlanDeCuentasService } from 'src/app/modules/plan-de-cuenta/plan-de-cuentas.service';
import { PlanDeCuentas } from 'src/app/models/plan-de-cuentas';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {

  constructor(private planDeCuentaService: PlanDeCuentasService) { }

getDatabase(planDeCuenta: PlanDeCuentas){
  

  
}

}
