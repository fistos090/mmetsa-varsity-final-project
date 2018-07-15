import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantMessagingComponent } from './instant-messaging.component';

describe('InstantMessagingComponent', () => {
  let component: InstantMessagingComponent;
  let fixture: ComponentFixture<InstantMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
