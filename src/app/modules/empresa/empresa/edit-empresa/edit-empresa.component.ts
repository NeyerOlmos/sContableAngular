import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from 'src/app/models/empresa';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmpresaService } from '../../empresa.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css']
})
export class EditEmpresaComponent implements OnInit {

  empresa$: Observable<Empresa>;
  constructor(private empresaService: EmpresaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('empresaId') ;
    this.empresaService.loadAll();
    this.empresa$ = this.empresaService.empresaList.pipe(
      map(empresas => empresas.find(item => item.Id === +id))
    );
    this.empresaService.load(+id);
  }
update(empresa: Empresa) {
  this.empresaService.update(empresa);
}
cancel(){
  this.router.navigate(['/Empresas/List']);
}
}
