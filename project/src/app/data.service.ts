import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { retry, catchError, tap, retryWhen } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/send-email';

  addJob(job:any):Observable<any>{
    const url= `http://localhost:3000/jobs/addJob`;
    const body =job
    return this.http.post(url,body);
  }
  addUser(user:any):Observable<any>{
    const url = `http://localhost:3000/users/adduser`;
    const body= user;
    return this.http.post(url,body);
  }
  addCompany(company:any):Observable<any>{
    const url = `http://localhost:3000/companies/addCompany`
    const body= company;
    return this.http.post(url,body)

  }

  getUser(user:any):Observable<any>{
    const url =`http://localhost:3000/users/check`;
    const body = user;
    return this.http.post(url,body);
  }
getUserId(user:any):Observable<any>{
  const url= `http://localhost:3000/users/userById`
  const body= user;
  return this.http.post(url,body)
}

getCompanyCheck(company:any){
  const url= `http://localhost:3000/companies/companyCheck`
  const body = company;
  return this.http.post(url,body)
}


getSkillId(id:number):Observable<any>{
  const url = `http://localhost:3000/skill/skills`
  const body= {id};
  return this.http.post(url,body)
}
addSkill(skill:any):Observable<any>{
  const url= `http://localhost:3000/skill/addSkill`
  const body= skill
  return this.http.post(url,body)
}
Apply(apply:any){
  const url=`http://localhost:3000/application/addApp`;
  const body = apply;
  return this.http.post(url,body)
}
getApplyUser(user_id:number){
  const url=`http://localhost:3000/application/appUser`;
  const body = {user_id};
  console.log(body)
  return this.http.post(url,body)
}
getApplyCompany(company_id:number){
  const url=`http://localhost:3000/application/application`;
  const body = {company_id};
  console.log("the body: ",body)
  return this.http.post(url,body)
}
updateApp(application_id:number,status:string){
  const url=`http://localhost:3000/application/update`;
  const body = {application_id,status};
  console.log("the body: ",body)
  return this.http.put(url,body)
}
deleteApp(application_id:number){
  const url=`http://localhost:3000/application/deleteApp/${application_id}`;
console.log(url)
  return this.http.delete(url)
}

deleteSkill(skillId:number){
  const url= `http://localhost:3000/skill/deleteSkill/${skillId}`
  console.log(url)
  return this.http.delete(url)
}


getJobs(){
  const url= `http://localhost:3000/jobs/getJobs`;

  return this.http.get(url)
}
getJobCategory(category_id:number){
  const url= `http://localhost:3000/jobs/getJobCategory`
  const body = {category_id}
  console.log(body)
  return this.http.post(url,body)
}

sendEmail(emailData: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, emailData);
}

deleteJob(job_id:number){
  const url=`http://localhost:3000/jobs/deleteJob/${job_id}`;
console.log(url)
  return this.http.delete(url)
}
getJobCompanyId(company_id:number){
  const url= `http://localhost:3000/jobs/getJobCompanyId`
  const body = {company_id}
  console.log(body)
  return this.http.post(url,body)
}

updateUser(userId:number,password:string){
  const url=`http://localhost:3000/users/update`;
  const body = {userId,password};
  console.log("the body: ",body)
  return this.http.put(url,body)
}

updateCompany(company_Id:number,password:string){
  const url=`http://localhost:3000/companies/update`;
  const body = {company_Id,password};
  console.log("the body: ",body)
  return this.http.put(url,body)
}
getCompanySearch(name:string){
  const url= `http://localhost:3000/companies/companySearch`
  const body= {name}
  return this.http.post(url,body)
}

getAllCompany(){
  const url=`http://localhost:3000/companies/company`
  return this.http.get(url)
}

getAllUser(){
  const url= `http://localhost:3000/users/getUsers`
  return this.http.get(url)
}
deleteUser(userId:number){
  const url=`http://localhost:3000/users/deleteUser/${userId}`;
console.log(url)
  return this.http.delete(url)
}
deleteCompany(company_id:number){
  const url=`http://localhost:3000/companies/deleteCompany/${company_id}`;
console.log(url)
  return this.http.delete(url)
}

updateStatusJob(job_id:number){
  const url= `http://localhost:3000/jobs/updateStatus`
  const body= {job_id}
  return this.http.put(url,body)
}

}


