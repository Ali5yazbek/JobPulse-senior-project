import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { response } from 'express';
@Component({
  selector: 'app-display-app',
  templateUrl: './display-app.component.html',
  styleUrls: ['./display-app.component.css']
})
export class DisplayAppComponent {
error=""
message=""
skills:any
  item:any;
  showBt:boolean=true
  application:any=[]
  information:any
  users={
    id:1, }
user={
  email:"",
  subject:"",
  text:""
}


arrayApp:any=[{id:1,status:"false",cv:"",appliedDate:"1/12/2023",user_id:2,company_id:1}]
constructor(private router:Router,private data: DataService)
{

}
ngOnInit(): void {
  const itemes = localStorage.getItem('item')
  if(itemes){
    this.arrayApp=JSON.parse(itemes)
  }
const info= localStorage.getItem('infoCompany')
if(info){
this.information= JSON.parse(info);
}
this.users={
  id:parseInt(this.information.company_id),
}
this.data.getApplyCompany(this.information.company_id).subscribe(
  (response)=>{
    this.application=response
    console.log(this.application)
    // this.application = this.application.filter((app:any)=>{console.log(app)})
    // console.log(this.application)
  }
)

}
showUser(id:number,i:string){
this.data.getSkillId(id).subscribe( (response)=>{
  this.skills=response;
  this.user.email=i
  console.log(this.user.email)
  console.log(this.skills)
});
}

switchE(i:string){
  this.user.email=i
}




moveToRoute(route:string){
  this.router.navigate([route]).then(() => {
    window.scrollTo(0, 0)

  });
}
updateApply(id:number){
  this.data.updateApp(id,"true").subscribe();
  this.sendEmail()
  // window.location.reload()
}
sendEmail() {
  const emailData = {
    to: this.user.email,
    subject: this.user.subject,
    text: this.user.text,
  };
this.data.sendEmail(emailData).subscribe(
  (response) => {
    console.log('Email sent successfully:', response);
    
  },
  (error) => {
    console.error('Error sending email:', error);
  }
);
}

deleteApply(id:number){
  this.data.deleteApp(id).subscribe();
  this.sendEmailReject();
  // this.application= this.application.filter((item:any) =>item.application_id!=id)
  window.location.reload()
}


sendEmailReject() {
  const emailData = {
    to: this.user.email,
    subject: "Reject application",
    text: "sorry for rejected!",
  };
this.data.sendEmail(emailData).subscribe(
  (response) => {
    console.log('Email sent successfully:', response);
  },
  (error) => {
    console.error('Error sending email:', error);
  }
);
}


}





