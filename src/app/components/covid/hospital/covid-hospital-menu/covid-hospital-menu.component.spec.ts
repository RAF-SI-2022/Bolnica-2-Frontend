import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidHospitalMenuComponent } from './covid-hospital-menu.component';

describe('CovidHospitalMenuComponent', () => {
  let component: CovidHospitalMenuComponent;
  let fixture: ComponentFixture<CovidHospitalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidHospitalMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidHospitalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
