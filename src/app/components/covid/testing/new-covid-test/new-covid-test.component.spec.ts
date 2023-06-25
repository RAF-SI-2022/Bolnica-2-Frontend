import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCovidTestComponent } from './new-covid-test.component';

describe('NewCovidTestComponent', () => {
  let component: NewCovidTestComponent;
  let fixture: ComponentFixture<NewCovidTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCovidTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCovidTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
