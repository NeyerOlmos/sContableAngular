import { Component, OnInit, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { PlanDeCuentas } from 'src/app/models/plan-de-cuentas';
import { PlanDeCuentasService } from '../../plan-de-cuentas.service';
import { BaseFormComponent } from 'src/app/shared/base-form/base-form.component';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-de-cuenta-list',
  templateUrl: './plan-de-cuenta-list.component.html',
  styleUrls: ['./plan-de-cuenta-list.component.css']
})
export class PlanDeCuentaListComponent
extends BaseFormComponent
implements OnInit {

  dataMapTest = new Map<string, string[]>([
    ['Activo', ['Caja y Banco', 'Inversiones', 'Creditos por venta', 'Otros Creditos']],
    ['Caja y Banco', ['Caja', 'Banco cta. cte.', 'Banco cta. cte.']],
    ['Inversiones', ['Valores mobiliarios con cotizacion', 'Inmuebles en alquiler', 'Banco plazo fijo']],
    ['Creditos por venta', ['Deudores por ventas', 'Documentos por cobrar sin gtia real', 'Documentos por cobrar con gtia real']],
    ['Pasivo', ['Cuentas por pagar', 'Prestamos', 'Otros pasivos']],
    ['Cuentas por pagar', ['Proveedores', 'Documentos por pagar sin gtia real', 'Documentos por pagar con gtia real']],
    ['Prestamos', ['Adelantos en cuenta corriente', 'Obligaciones bancarias a pagar']],
    ['Otros pasivos', ['Acreedores varios', 'Gastos a pagar', 'Hipotecas a pagar', 'Seguros a pagar']]
  ]);
  rootLevelNodesTest: string[] = ['Activo', 'Pasivo'];
  rootLevelNodesTest2: string[] = [];
  dataMapTest2 = new Map<string, string[]>([]);
  sw: boolean = false;
  constructor(private planDeCuentaService: PlanDeCuentasService, private router: Router) {
    super();
  }

  planDeCuentasList$: Observable<PlanDeCuentas[]>;
 // treeControl = new NestedTreeControl<FoodNode>(node => node.children);
 // dataSource = new MatTreeNestedDataSource<FoodNode>();
  ngOnInit() {


    this.planDeCuentasList$ = this.planDeCuentaService.planDeCuentasList;
    this.planDeCuentaService.loadAll();
   // this.dataSource.data = TREE_DATA;

  }
  goToEditPlanDeCuenta(planDeCuenta: PlanDeCuentas)
  {
    this.router.navigate(['/PlanDeCuentas/Edit/' + planDeCuenta.Cod ])
  }
  deletePlanDeCuenta(planDeCuenta: PlanDeCuentas){
    this.planDeCuentaService.remove(planDeCuenta.Cod);
  }

  
}
