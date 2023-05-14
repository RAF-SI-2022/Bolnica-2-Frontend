import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReceptionComponent } from './new-reception.component';

describe('NewReceptionComponent', () => {
  let component: NewReceptionComponent;
  let fixture: ComponentFixture<NewReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
