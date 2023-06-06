import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocStationaryMedicalReportHistoryComponent } from './doc-stationary-medical-report-history.component';

describe('DocStationaryMedicalReportHistoryComponent', () => {
  let component: DocStationaryMedicalReportHistoryComponent;
  let fixture: ComponentFixture<DocStationaryMedicalReportHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocStationaryMedicalReportHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocStationaryMedicalReportHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
