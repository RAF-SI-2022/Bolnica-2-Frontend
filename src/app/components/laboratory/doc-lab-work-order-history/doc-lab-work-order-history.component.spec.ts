import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLabWorkOrderHistoryComponent } from './doc-lab-work-order-history.component';

describe('DocLabWorkOrderHistoryComponent', () => {
  let component: DocLabWorkOrderHistoryComponent;
  let fixture: ComponentFixture<DocLabWorkOrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocLabWorkOrderHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocLabWorkOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
