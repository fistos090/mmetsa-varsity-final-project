import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DobDatePickerComponent } from './dob-date-picker.component';

describe('DobDatePickerComponent', () => {
  let component: DobDatePickerComponent;
  let fixture: ComponentFixture<DobDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DobDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DobDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
