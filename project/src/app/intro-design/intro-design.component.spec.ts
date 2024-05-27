import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDesignComponent } from './intro-design.component';

describe('IntroDesignComponent', () => {
  let component: IntroDesignComponent;
  let fixture: ComponentFixture<IntroDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroDesignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
