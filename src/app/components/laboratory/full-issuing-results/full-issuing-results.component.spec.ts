import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullIssuingResultsComponent } from './full-issuing-results.component';

describe('FullIssuingResultsComponent', () => {
  let component: FullIssuingResultsComponent;
  let fixture: ComponentFixture<FullIssuingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullIssuingResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullIssuingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
