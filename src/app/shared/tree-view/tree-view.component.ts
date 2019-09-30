import { Component, OnInit, Injectable, Input } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlanDeCuentas } from 'src/app/models/plan-de-cuentas';
import { PlanDeCuentasService } from 'src/app/modules/plan-de-cuenta/plan-de-cuentas.service';
import { TreeViewService } from './tree-view.service';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {}
}
@Injectable({
  providedIn: 'root'
})
/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class DynamicDatabase {

  //planDeCuenta: PlanDeCuentas;
  dataMap = new Map<string, string[]>([
    ['Activo', ['Caja y Banco', 'Inversiones', 'Creditos por venta', 'Otros Creditos']],
    ['Caja y Banco', ['Caja', 'Banco cta. cte.', 'Banco cta. cte.']],
    ['Inversiones', ['Valores mobiliarios con cotizacion', 'Inmuebles en alquiler', 'Banco plazo fijo']],
    ['Creditos por venta', ['Deudores por ventas', 'Documentos por cobrar sin gtia real', 'Documentos por cobrar con gtia real']],
    ['Pasivo', ['Cuentas por pagar', 'Prestamos', 'Otros pasivos']],
    ['Cuentas por pagar', ['Proveedores', 'Documentos por pagar sin gtia real', 'Documentos por pagar con gtia real']],
    ['Prestamos', ['Adelantos en cuenta corriente', 'Obligaciones bancarias a pagar']],
    ['Otros pasivos', ['Acreedores varios', 'Gastos a pagar', 'Hipotecas a pagar', 'Seguros a pagar']]
  ]);
  rootLevelNodes: string[] = ['Activo', 'Pasivo'];
  constructor(private planDeCuentasService: PlanDeCuentasService){

  }
  loadData(planDeCuenta: PlanDeCuentas){
    
     this.dataMap = this.planDeCuentasService.getPlanDeCuentasFinal(planDeCuenta)
     console.log("LOOOOOL")
     console.log(this.planDeCuentasService.getPlanDeCuentasFinal(planDeCuenta))
     console.log("LOOOOOL")
    this.rootLevelNodes = this.planDeCuentasService.getRootNodesByPlanDeCuentasFinal(planDeCuenta)
  
  }
  /** Initial data from database */
  initialData(planDeCuenta: PlanDeCuentas): DynamicFlatNode[] {
    //this.loadData(planDeCuenta);
    console.log("fromInitial")
    console.log(this.rootLevelNodes)
    console.log(this.dataMap)
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private _database: DynamicDatabase) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(name =>
          new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
  providers: [DynamicDatabase]
})
export class TreeViewComponent implements OnInit {

  //@Input() dataMap: Map<string, string[]>;
  //@Input() rootLevelNodes: string[];
  @Input() planDeCuenta: PlanDeCuentas;
  constructor(private planDeCuentasService: PlanDeCuentasService,private treeViewService: TreeViewService,private database: DynamicDatabase) {
    
  }
  // hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
   treeControl: FlatTreeControl<DynamicFlatNode>;
   dataSource: DynamicDataSource;

    dataMap2 = new Map<string, string[]>(); 
    
    rootLevelNodes2 : string[] = [];
  ngOnInit() {

    
    var dataMap = new Map<string, string[]>(); 
    var rootLevelNodes : string[] = [];
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    // database = new DynamicDatabase();
    
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);
    //this.database.loadData(this.planDeCuenta);

    this.dataSource.data = this.database.initialData(this.planDeCuenta);
    

   // this.treeViewService.getDatabase(this.planDeCuenta);

    this.planDeCuentasService.getPlanDeCuentas(this.planDeCuenta).subscribe(_dataMap=>{
      console.log("in the subs");
      console.log(_dataMap);
      dataMap = _dataMap;
      this.dataMap2 = _dataMap;
      
    }
  );

  this.planDeCuentasService.getRootNodesByPlanDeCuentas(this.planDeCuenta).subscribe(_rootLevelNodes=>
    {
      rootLevelNodes=rootLevelNodes
      this.rootLevelNodes2=rootLevelNodes
     // console.log("In of last Promise :V")
      
    //  console.log(this.dataMap2)
     // console.log(this.rootLevelNodes2)
    }
    );
    
  //  this.database.setValues(this.dataMap2,this.rootLevelNodes2);
    
  //  this.dataSource = new DynamicDataSource(this.treeControl, this.database);
   // this.dataSource.data = this.database.initialData();


   // console.log("Out of Promises :V")

 //   console.log(this.treeControl)
   // console.log(this.dataSource)
   // console.log(this.dataSource.data)
  }


  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
}
