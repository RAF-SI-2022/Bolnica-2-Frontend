import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStationaryPatientReceptionsComponent } from './view-stationary-patient-receptions.component';

describe('ViewStationaryPatientReceptionsComponent', () => {
  let component: ViewStationaryPatientReceptionsComponent;
  let fixture: ComponentFixture<ViewStationaryPatientReceptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStationaryPatientReceptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStationaryPatientReceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
