import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanDeCuentaComponent } from './add-plan-de-cuenta.component';

describe('AddPlanDeCuentaComponent', () => {
  let component: AddPlanDeCuentaComponent;
  let fixture: ComponentFixture<AddPlanDeCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanDeCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanDeCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
