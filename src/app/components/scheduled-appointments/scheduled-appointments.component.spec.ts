import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledAppointmentsComponent } from './scheduled-appointments.component';

describe('ScheduledAppointmentsComponent', () => {
  let component: ScheduledAppointmentsComponent;
  let fixture: ComponentFixture<ScheduledAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
