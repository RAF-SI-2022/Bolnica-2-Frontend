import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCovidHospitalizedComponent } from './search-covid-hospitalized.component';

describe('SearchCovidHospitalizedComponent', () => {
  let component: SearchCovidHospitalizedComponent;
  let fixture: ComponentFixture<SearchCovidHospitalizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCovidHospitalizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCovidHospitalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
