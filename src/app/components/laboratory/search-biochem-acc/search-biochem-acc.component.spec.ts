import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBiochemAccComponent } from './search-biochem-acc.component';

describe('SearchBiochemAccComponent', () => {
  let component: SearchBiochemAccComponent;
  let fixture: ComponentFixture<SearchBiochemAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBiochemAccComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBiochemAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
