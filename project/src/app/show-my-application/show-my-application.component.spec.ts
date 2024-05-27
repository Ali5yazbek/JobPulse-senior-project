import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyApplicationComponent } from './show-my-application.component';

describe('ShowMyApplicationComponent', () => {
  let component: ShowMyApplicationComponent;
  let fixture: ComponentFixture<ShowMyApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMyApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
