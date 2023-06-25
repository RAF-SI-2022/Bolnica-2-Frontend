import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledCovidTestsComponent } from './scheduled-covid-tests.component';

describe('ScheduledCovidTestsComponent', () => {
  let component: ScheduledCovidTestsComponent;
  let fixture: ComponentFixture<ScheduledCovidTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledCovidTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledCovidTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
