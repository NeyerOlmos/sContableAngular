import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { Observable } from 'rxjs';
import { EmpresaService } from '../../empresa.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details-empresa',
  templateUrl: './details-empresa.component.html',
  styleUrls: ['./details-empresa.component.css']
})
export class DetailsEmpresaComponent implements OnInit {
  empresa$: Observable<Empresa>;
  constructor(private empresaService: EmpresaService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('empresaId') ;
    this.empresaService.loadAll();
    this.empresa$ = this.empresaService.empresaList.pipe(
      map(empresas => empresas.find(item => item.Id === +id))
    );
    this.empresaService.load(+id);
  }

}
