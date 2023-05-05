import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationaryPatientReceptionComponent } from './stationary-patient-reception.component';

describe('StationaryPatientReceptionComponent', () => {
  let component: StationaryPatientReceptionComponent;
  let fixture: ComponentFixture<StationaryPatientReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationaryPatientReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationaryPatientReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
