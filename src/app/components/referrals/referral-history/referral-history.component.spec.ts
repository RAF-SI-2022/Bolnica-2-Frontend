import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralHistoryComponent } from './referral-history.component';

describe('ReferralHistoryComponent', () => {
  let component: ReferralHistoryComponent;
  let fixture: ComponentFixture<ReferralHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferralHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
