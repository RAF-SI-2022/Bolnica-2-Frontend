import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShiftsComponent } from './edit-shifts.component';

describe('EditShiftsComponent', () => {
  let component: EditShiftsComponent;
  let fixture: ComponentFixture<EditShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditShiftsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
