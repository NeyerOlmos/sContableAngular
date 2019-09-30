import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartamentoComponent } from './edit-departamento.component';

describe('EditDepartamentoComponent', () => {
  let component: EditDepartamentoComponent;
  let fixture: ComponentFixture<EditDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
