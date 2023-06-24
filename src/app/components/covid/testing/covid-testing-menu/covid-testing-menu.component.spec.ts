import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidTestingMenuComponent } from './covid-testing-menu.component';

describe('CovidTestingMenuComponent', () => {
  let component: CovidTestingMenuComponent;
  let fixture: ComponentFixture<CovidTestingMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidTestingMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CovidTestingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
