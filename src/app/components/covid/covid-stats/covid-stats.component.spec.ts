import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidStatsComponent } from './covid-stats.component';

describe('CovidStatsComponent', () => {
  let component: CovidStatsComponent;
  let fixture: ComponentFixture<CovidStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
