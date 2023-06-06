import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidSingleCountryComponent } from './covid-single-country.component';

describe('CovidSingleCountryComponent', () => {
  let component: CovidSingleCountryComponent;
  let fixture: ComponentFixture<CovidSingleCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidSingleCountryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidSingleCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
