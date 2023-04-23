import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IllnessHistoryRecordComponent } from './illness-history-record.component';

describe('IllnessHistoryRecordComponent', () => {
  let component: IllnessHistoryRecordComponent;
  let fixture: ComponentFixture<IllnessHistoryRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IllnessHistoryRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IllnessHistoryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
