import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCovidVaccinationComponent } from './schedule-covid-vaccination.component';

describe('ScheduleCovidVaccinationComponent', () => {
  let component: ScheduleCovidVaccinationComponent;
  let fixture: ComponentFixture<ScheduleCovidVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCovidVaccinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCovidVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
