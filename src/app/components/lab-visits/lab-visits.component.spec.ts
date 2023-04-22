import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabVisitsComponent } from './lab-visits.component';

describe('LabVisitsComponent', () => {
  let component: LabVisitsComponent;
  let fixture: ComponentFixture<LabVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabVisitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
