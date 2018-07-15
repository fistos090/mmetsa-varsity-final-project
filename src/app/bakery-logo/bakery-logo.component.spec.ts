import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeryLogoComponent } from './bakery-logo.component';

describe('BakeryLogoComponent', () => {
  let component: BakeryLogoComponent;
  let fixture: ComponentFixture<BakeryLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BakeryLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BakeryLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
