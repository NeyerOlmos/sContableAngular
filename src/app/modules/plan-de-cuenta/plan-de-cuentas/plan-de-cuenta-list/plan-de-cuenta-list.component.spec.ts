import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDeCuentaListComponent } from './plan-de-cuenta-list.component';

describe('PlanDeCuentaListComponent', () => {
  let component: PlanDeCuentaListComponent;
  let fixture: ComponentFixture<PlanDeCuentaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDeCuentaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanDeCuentaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
