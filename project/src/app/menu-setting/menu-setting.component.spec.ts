import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSettingComponent } from './menu-setting.component';

describe('MenuSettingComponent', () => {
  let component: MenuSettingComponent;
  let fixture: ComponentFixture<MenuSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
