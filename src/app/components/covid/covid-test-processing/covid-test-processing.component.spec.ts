import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestProcessingComponent } from './covid-test-processing.component';

describe('CovidTestProcessingComponent', () => {
  let component: CovidTestProcessingComponent;
  let fixture: ComponentFixture<CovidTestProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidTestProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidTestProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
