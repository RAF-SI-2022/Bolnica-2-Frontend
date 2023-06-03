import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseStationaryMenuComponent } from './nurse-stationary-menu.component';

describe('NurseStationaryMenuComponent', () => {
  let component: NurseStationaryMenuComponent;
  let fixture: ComponentFixture<NurseStationaryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NurseStationaryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseStationaryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
