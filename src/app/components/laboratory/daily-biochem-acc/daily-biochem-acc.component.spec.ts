import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBiochemAccComponent } from './daily-biochem-acc.component';

describe('DailyBiochemAccComponent', () => {
  let component: DailyBiochemAccComponent;
  let fixture: ComponentFixture<DailyBiochemAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyBiochemAccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyBiochemAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
