import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCovidHealthStateComponent } from './register-covid-health-state.component';

describe('RegisterCovidHealthStateComponent', () => {
  let component: RegisterCovidHealthStateComponent;
  let fixture: ComponentFixture<RegisterCovidHealthStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCovidHealthStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCovidHealthStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
