import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobComponent } from './job/job.component';
import { HomeComponent } from './home/home.component';
import { ApplyComponent } from './apply/apply.component';
import { NavComponent } from './nav/nav.component';
import { SettingComponent } from './setting/setting.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { AddJobComponent } from './add-job/add-job.component';
import { DisplayAppComponent } from './display-app/display-app.component';
import { DashCompanyComponent } from './dash-company/dash-company.component';
import { SkillPageComponent } from './skill-page/skill-page.component';
import { LogInCompanyComponent } from './log-in-company/log-in-company.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { ShowMyApplicationComponent } from './show-my-application/show-my-application.component';
import { SettingCompanyComponent } from './setting-company/setting-company.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '',   redirectTo: '/logIn', pathMatch: 'full' },
  {path:"job",component:JobComponent},
  {path:"home",component:HomeComponent},
  {path:"apply",component:ApplyComponent},
  {path:'nav',component:NavComponent},
  {path:'setting',component:SettingComponent},
  {path:'logIn',component:LogInComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashCompany',component:DashCompanyComponent},
  {path:'addJob',component:AddJobComponent},
  {path:'displayApp',component:DisplayAppComponent},
  {path:'skillPage',component:SkillPageComponent},
  {path:'logInCompany',component:LogInCompanyComponent},
  {path:'registerCompany',component:RegisterCompanyComponent},
  {path:'showMyApplication',component:ShowMyApplicationComponent},
  {path:'settingComp',component:SettingCompanyComponent},
  {path:"adminPage",component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
