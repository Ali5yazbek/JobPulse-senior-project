import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAminComponent } from './nav-amin.component';

describe('NavAminComponent', () => {
  let component: NavAminComponent;
  let fixture: ComponentFixture<NavAminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
