import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMedicalHistoryComponent } from './full-medical-history.component';

describe('FullMedicalHistoryComponent', () => {
  let component: FullMedicalHistoryComponent;
  let fixture: ComponentFixture<FullMedicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullMedicalHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
