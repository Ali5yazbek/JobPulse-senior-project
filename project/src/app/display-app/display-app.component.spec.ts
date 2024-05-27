import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAppComponent } from './display-app.component';

describe('DisplayAppComponent', () => {
  let component: DisplayAppComponent;
  let fixture: ComponentFixture<DisplayAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
