import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { response } from 'express';

@Component({
  selector: 'app-show-my-application',
  templateUrl: './show-my-application.component.html',
  styleUrls: ['./show-my-application.component.css']
})
export class ShowMyApplicationComponent implements OnInit {
  information:any
  users={
    id:"",
    name:"",
    email:"",
    phone:"",
    password:"",  }

application:any=[];
constructor(private data: DataService,private route:Router){}

ngOnInit(): void {
  if (localStorage.getItem('info')){}else{this.route.navigate(["/logIn/"]).then(() => {window.scrollTo(0, 0)});}
  const info = localStorage.getItem('info');
  console.log(info)
  if(info){
    this.information= JSON.parse(info);
    console.log(this.information)
    this.users={
      id:this.information.userId,
      name:this.information.name,
      email:this.information.email,
      phone:this.information.phoneNumber,
      password:this.information.password
    }
  }else{
    console.log("Error");
  }
  console.log("userIDApp: ",this.users.id)
  this.data.getApplyUser(parseInt(this.users.id)).subscribe(
    (response: any)=>{
      this.application=response
  console.log(response);
  });

}
deleteApp(id:number){
  this.data.deleteApp(id).subscribe();
  // this.application= this.application.filter((item:any) =>item.application_id!=id)
  window.location.reload()
}

}
