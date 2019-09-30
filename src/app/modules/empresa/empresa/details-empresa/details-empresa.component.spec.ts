import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEmpresaComponent } from './details-empresa.component';

describe('DetailsEmpresaComponent', () => {
  let component: DetailsEmpresaComponent;
  let fixture: ComponentFixture<DetailsEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
