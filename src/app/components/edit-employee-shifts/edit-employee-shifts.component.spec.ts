import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmployeeShiftsComponent } from './edit-employee-shifts.component';

describe('EditEmployeeShiftsComponent', () => {
  let component: EditEmployeeShiftsComponent;
  let fixture: ComponentFixture<EditEmployeeShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditEmployeeShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmployeeShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
