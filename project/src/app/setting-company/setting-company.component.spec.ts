import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCompanyComponent } from './setting-company.component';

describe('SettingCompanyComponent', () => {
  let component: SettingCompanyComponent;
  let fixture: ComponentFixture<SettingCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
