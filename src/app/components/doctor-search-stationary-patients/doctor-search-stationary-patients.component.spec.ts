import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchStationaryPatientsComponent } from './doctor-search-stationary-patients.component';

describe('DoctorSearchStationaryPatientsComponent', () => {
  let component: DoctorSearchStationaryPatientsComponent;
  let fixture: ComponentFixture<DoctorSearchStationaryPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSearchStationaryPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSearchStationaryPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
