import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBusketComponent } from './shopping-basket.component';

describe('ShoppingBusketComponent', () => {
  let component: ShoppingBusketComponent;
  let fixture: ComponentFixture<ShoppingBusketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingBusketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBusketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
