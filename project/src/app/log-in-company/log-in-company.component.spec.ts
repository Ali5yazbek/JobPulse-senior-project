import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInCompanyComponent } from './log-in-company.component';

describe('LogInCompanyComponent', () => {
  let component: LogInCompanyComponent;
  let fixture: ComponentFixture<LogInCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
