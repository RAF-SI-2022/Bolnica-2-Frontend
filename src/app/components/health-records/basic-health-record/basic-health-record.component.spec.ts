import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicHealthRecordComponent } from './basic-health-record.component';

describe('BasicHealthRecordComponent', () => {
  let component: BasicHealthRecordComponent;
  let fixture: ComponentFixture<BasicHealthRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicHealthRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicHealthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
