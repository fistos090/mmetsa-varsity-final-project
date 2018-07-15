import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavMenuComponent } from './topnav-menu.component';

describe('TopnavMenuComponent', () => {
  let component: TopnavMenuComponent;
  let fixture: ComponentFixture<TopnavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
