import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionVisitsComponent } from './reception-visits.component';

describe('ReceptionVisitsComponent', () => {
  let component: ReceptionVisitsComponent;
  let fixture: ComponentFixture<ReceptionVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionVisitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
