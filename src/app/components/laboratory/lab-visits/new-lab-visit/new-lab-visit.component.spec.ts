import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLabVisitComponent } from './new-lab-visit.component';

describe('NewLabVisitComponent', () => {
  let component: NewLabVisitComponent;
  let fixture: ComponentFixture<NewLabVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLabVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLabVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
