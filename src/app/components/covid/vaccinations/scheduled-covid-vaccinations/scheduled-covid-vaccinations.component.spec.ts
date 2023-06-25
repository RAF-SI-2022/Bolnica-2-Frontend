import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledCovidVaccinationsComponent } from './scheduled-covid-vaccinations.component';

describe('ScheduledCovidVaccinationsComponent', () => {
  let component: ScheduledCovidVaccinationsComponent;
  let fixture: ComponentFixture<ScheduledCovidVaccinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledCovidVaccinationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledCovidVaccinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
