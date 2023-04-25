import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledPatientsComponent } from './scheduled-patients.component';

describe('ScheduledPatientsComponent', () => {
  let component: ScheduledPatientsComponent;
  let fixture: ComponentFixture<ScheduledPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
