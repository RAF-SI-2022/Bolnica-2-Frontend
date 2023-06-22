import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsForCovidExamListComponent } from './patients-for-covid-exam-list.component';

describe('PatientsForCovidExamListComponent', () => {
  let component: PatientsForCovidExamListComponent;
  let fixture: ComponentFixture<PatientsForCovidExamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsForCovidExamListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsForCovidExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
