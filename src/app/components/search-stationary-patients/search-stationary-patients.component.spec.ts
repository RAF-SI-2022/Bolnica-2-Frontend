import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStationaryPatientsComponent } from './search-stationary-patients.component';

describe('SearchStationaryPatientsComponent', () => {
  let component: SearchStationaryPatientsComponent;
  let fixture: ComponentFixture<SearchStationaryPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStationaryPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStationaryPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
