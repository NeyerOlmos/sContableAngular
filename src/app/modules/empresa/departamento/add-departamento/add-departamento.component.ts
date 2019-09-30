import { Component, OnInit, Input } from '@angular/core';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentoService } from '../../departamento.service';

@Component({
  selector: 'app-add-departamento',
  templateUrl: './add-departamento.component.html',
  styleUrls: ['./add-departamento.component.css']
})
export class AddDepartamentoComponent implements OnInit {
  @Input() idEmpresa: number;
  departamento: Departamento;
  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit() {
    
    this.departamento= new Departamento();
  }
addDepartamento(departamento: Departamento){
  if(this.idEmpresa !=null || this.idEmpresa != undefined ){
    departamento.id_empresa = this.idEmpresa;
  }
  this.departamentoService.create(departamento);
}
}
