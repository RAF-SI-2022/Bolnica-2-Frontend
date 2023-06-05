import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorStationaryMenuComponent } from './doctor-stationary-menu.component';

describe('DoctorStationaryMenuComponent', () => {
  let component: DoctorStationaryMenuComponent;
  let fixture: ComponentFixture<DoctorStationaryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorStationaryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorStationaryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
