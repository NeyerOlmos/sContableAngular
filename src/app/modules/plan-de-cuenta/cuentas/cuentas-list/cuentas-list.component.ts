import { Component, OnInit } from '@angular/core';
import { CuentaContable } from 'src/app/models/cuenta-contable';
import { Observable } from 'rxjs';
import { CuentaService } from '../../cuenta.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css']
})
export class CuentasListComponent implements OnInit {

  cuentasList$: Observable<CuentaContable[]>;
  constructor( private cuentasService: CuentaService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.cuentasList$ = this.cuentasService.cuentasList;
    // this.cuentasList$ = this.cuentasService.getCuentasByLevel(2);
    this.cuentasService.loadAll();
  }

  goToDetails(Id: string) {
    this.router.navigate(['/Cuenta/Details/' + Id]);
  }
  goToEditCuenta(Id: string) {
    this.router.navigate(['/Cuenta/Edit/' + Id]);
  }
  goToAddCuenta(){
    this.router.navigate(['/Cuenta/Add']);
  }
  deleteCuenta(Id: string) {
    this.cuentasService.remove(Id);
  }
  getLevel(cuenta: CuentaContable){
    console.log(this.cuentasService.getLevel(cuenta));
  }
  showChildrends(id: number){
      
   // this.cuentasService.getDirectChildrenByCod(cod);
    //this.cuentasService.getChildrenById(this.cuentasList$,id).subscribe(c=>console.log(c))
  }
}
