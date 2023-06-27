import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidHistoryComponent } from './covid-history.component';

describe('CovidHistoryComponent', () => {
  let component: CovidHistoryComponent;
  let fixture: ComponentFixture<CovidHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
