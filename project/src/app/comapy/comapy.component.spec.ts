import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapyComponent } from './comapy.component';

describe('ComapyComponent', () => {
  let component: ComapyComponent;
  let fixture: ComponentFixture<ComapyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComapyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
