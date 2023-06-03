import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocPatientConditionHistoryComponent } from './doc-patient-condition-history.component';

describe('DocPatientConditionHistoryComponent', () => {
  let component: DocPatientConditionHistoryComponent;
  let fixture: ComponentFixture<DocPatientConditionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocPatientConditionHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocPatientConditionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
