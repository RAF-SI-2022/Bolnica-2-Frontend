import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationaryMenuComponent } from './stationary-menu.component';

describe('StationaryMenuComponent', () => {
  let component: StationaryMenuComponent;
  let fixture: ComponentFixture<StationaryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationaryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationaryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
