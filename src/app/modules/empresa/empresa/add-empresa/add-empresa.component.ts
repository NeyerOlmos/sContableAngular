import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from '../../empresa.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add-empresa.component.css']
})
export class AddEmpresaComponent implements OnInit {
  empresa: Empresa;
  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.empresa = new Empresa();
  }
  addEmpresa(empresa: Empresa){
    console.log(empresa)
    this.empresaService.create(empresa);
 }
}
