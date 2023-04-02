import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistDoctorExaminationComponent } from './specialist-doctor-examination.component';

describe('SpecialistDoctorExaminationComponent', () => {
  let component: SpecialistDoctorExaminationComponent;
  let fixture: ComponentFixture<SpecialistDoctorExaminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistDoctorExaminationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistDoctorExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
