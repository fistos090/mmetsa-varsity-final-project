import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSpinnerComponent } from './service-spinner.component';

describe('ServiceSpinnerComponent', () => {
  let component: ServiceSpinnerComponent;
  let fixture: ComponentFixture<ServiceSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
