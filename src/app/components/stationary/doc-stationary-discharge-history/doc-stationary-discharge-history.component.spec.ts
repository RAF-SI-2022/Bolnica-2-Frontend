import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocStationaryDischargeHistoryComponent } from './doc-stationary-discharge-history.component';

describe('DocStationaryDischargeHistoryComponent', () => {
  let component: DocStationaryDischargeHistoryComponent;
  let fixture: ComponentFixture<DocStationaryDischargeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocStationaryDischargeHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocStationaryDischargeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
