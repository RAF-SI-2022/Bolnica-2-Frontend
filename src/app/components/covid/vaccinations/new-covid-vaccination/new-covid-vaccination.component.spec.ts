import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCovidVaccinationComponent } from './new-covid-vaccination.component';

describe('NewCovidVaccinationComponent', () => {
  let component: NewCovidVaccinationComponent;
  let fixture: ComponentFixture<NewCovidVaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCovidVaccinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCovidVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
