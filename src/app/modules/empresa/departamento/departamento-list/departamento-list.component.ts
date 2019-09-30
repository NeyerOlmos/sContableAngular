import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from '../../departamento.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.css']
})
export class DepartamentoListComponent implements OnInit {

  @Input() idEmpresa;
  departamentoList$: Observable<Departamento[]> ;
  constructor( private departamentoService: DepartamentoService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    if(this.idEmpresa){

      this.departamentoList$ = this.departamentoService.departamentoListByEmpresaId(this.idEmpresa);
    }else{

      this.departamentoList$ = this.departamentoService.departamentoList;
    }
    this.departamentoService.loadAll();
  }

  goToDetails(Id: string) {
    this.router.navigate(['/Departamento/Details/' + Id]);
  }
  goToEditEmpresa(Id: string) {
    this.router.navigate(['/Departamento/Edit/' + Id]);
  }
  deleteDepartamento(departamento: Departamento) {
    this.departamentoService.remove(departamento.Cod);
  }
}
