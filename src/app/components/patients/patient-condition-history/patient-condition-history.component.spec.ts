import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConditionHistoryComponent } from './patient-condition-history.component';

describe('PatientConditionHistoryComponent', () => {
  let component: PatientConditionHistoryComponent;
  let fixture: ComponentFixture<PatientConditionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConditionHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientConditionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
