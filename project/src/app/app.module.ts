import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';
import { JobComponent } from './job/job.component';
import { IntroDesignComponent } from './intro-design/intro-design.component';
import { ComapyComponent } from './comapy/comapy.component';
import { ApplyComponent } from './apply/apply.component';
import { AddJobComponent } from './add-job/add-job.component';
import { DisplayAppComponent } from './display-app/display-app.component';
import { SettingComponent } from './setting/setting.component';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';
import { InfoComponent } from './info/info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { DashCompanyComponent } from './dash-company/dash-company.component';
import { NavCompanyComponent } from './nav-company/nav-company.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillPageComponent } from './skill-page/skill-page.component';
import { LogInCompanyComponent } from './log-in-company/log-in-company.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { ShowMyApplicationComponent } from './show-my-application/show-my-application.component';
import { SettingCompanyComponent } from './setting-company/setting-company.component';
import { AdminComponent } from './admin/admin.component';
import { NavAminComponent } from './nav-amin/nav-amin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CategoryComponent,
    JobComponent,
    IntroDesignComponent,
    ComapyComponent,
    ApplyComponent,
    AddJobComponent,
    DisplayAppComponent,
    SettingComponent,
    MenuSettingComponent,
    InfoComponent,
    LogInComponent,
    RegisterComponent,
    DashCompanyComponent,
    NavCompanyComponent,
    SkillPageComponent,
    LogInCompanyComponent,
    RegisterCompanyComponent,
    ShowMyApplicationComponent,
    SettingCompanyComponent,
    AdminComponent,
    NavAminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
