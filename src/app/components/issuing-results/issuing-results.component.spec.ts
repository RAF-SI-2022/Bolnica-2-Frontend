import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuingResultsComponent } from './issuing-results.component';

describe('IssuingResultsComponent', () => {
  let component: IssuingResultsComponent;
  let fixture: ComponentFixture<IssuingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuingResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
