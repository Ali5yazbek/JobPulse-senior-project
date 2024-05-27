import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCompanyComponent } from './dash-company.component';

describe('DashCompanyComponent', () => {
  let component: DashCompanyComponent;
  let fixture: ComponentFixture<DashCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
