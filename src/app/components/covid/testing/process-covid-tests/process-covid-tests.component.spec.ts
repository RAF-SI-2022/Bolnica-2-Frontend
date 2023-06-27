import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCovidTestsComponent } from './process-covid-tests.component';

describe('ProcessCovidTestsComponent', () => {
  let component: ProcessCovidTestsComponent;
  let fixture: ComponentFixture<ProcessCovidTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessCovidTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessCovidTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
