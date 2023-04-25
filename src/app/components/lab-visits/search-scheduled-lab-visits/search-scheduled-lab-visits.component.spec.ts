import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchScheduledLabVisitsComponent } from './search-scheduled-lab-visits.component';

describe('SearchScheduledLabVisitsComponent', () => {
  let component: SearchScheduledLabVisitsComponent;
  let fixture: ComponentFixture<SearchScheduledLabVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchScheduledLabVisitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchScheduledLabVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
