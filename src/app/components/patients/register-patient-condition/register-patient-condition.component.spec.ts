import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPatientConditionComponent } from './register-patient-condition.component';

describe('RegisterPatientConditionComponent', () => {
  let component: RegisterPatientConditionComponent;
  let fixture: ComponentFixture<RegisterPatientConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPatientConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPatientConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
