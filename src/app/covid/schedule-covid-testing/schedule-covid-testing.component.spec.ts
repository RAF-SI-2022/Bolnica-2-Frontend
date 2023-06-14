import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCovidTestingComponent } from './schedule-covid-testing.component';

describe('ScheduleCovidTestingComponent', () => {
  let component: ScheduleCovidTestingComponent;
  let fixture: ComponentFixture<ScheduleCovidTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCovidTestingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCovidTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
