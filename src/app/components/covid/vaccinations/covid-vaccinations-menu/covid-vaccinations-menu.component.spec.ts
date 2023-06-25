import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidVaccinationsMenuComponent } from './covid-vaccinations-menu.component';

describe('CovidVaccinationsMenuComponent', () => {
  let component: CovidVaccinationsMenuComponent;
  let fixture: ComponentFixture<CovidVaccinationsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidVaccinationsMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidVaccinationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
