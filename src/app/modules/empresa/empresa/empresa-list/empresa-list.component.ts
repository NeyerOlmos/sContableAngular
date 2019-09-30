import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';
import { EmpresaService } from '../../empresa.service';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {
  empresaList$: Observable<Empresa[]> ;
  constructor( private empresasService: EmpresaService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    this.empresaList$ = this.empresasService.empresaList;
    this.empresasService.loadAll();
  }

  goToDetails(Id: string) {
    this.router.navigate(['/Empresas/Details/' + Id]);
  }
  goToEditEmpresa(Id: string) {
    this.router.navigate(['/Empresas/Edit/' + Id]);
  }
  deleteEmpresa(Id: string) {
    this.empresasService.remove(Id);
  }
}
