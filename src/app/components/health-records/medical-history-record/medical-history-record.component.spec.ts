import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryRecordComponent } from './medical-history-record.component';

describe('MedicalHistoryRecordComponent', () => {
  let component: MedicalHistoryRecordComponent;
  let fixture: ComponentFixture<MedicalHistoryRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
