import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlanDeCuentaComponent } from './edit-plan-de-cuenta.component';

describe('EditPlanDeCuentaComponent', () => {
  let component: EditPlanDeCuentaComponent;
  let fixture: ComponentFixture<EditPlanDeCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlanDeCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlanDeCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
