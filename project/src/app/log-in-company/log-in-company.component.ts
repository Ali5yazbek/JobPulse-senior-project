import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-log-in-company',
  templateUrl: './log-in-company.component.html',
  styleUrls: ['./log-in-company.component.css']
})
export class LogInCompanyComponent {
  user = {
    email: '',
    password: ''
  };
  check=false;
  message=""
  error=""
  constructor(private router:Router, private data: DataService){}

  // log(){
  //   this.data.getCompanyCheck(this.user).subscribe(
  //     (response: any)=>{

  //     if (response.length==1){
  //       localStorage.setItem("infoCompany",JSON.stringify(response[0]));

  //       console.log(response);
  //       this.router.navigate(["/dashCompany/"]).then(() => {
  //         window.scrollTo(0, 0)
  //       });

  //     } else{
  //       console.log("try again");
  //     }
  // console.log(response);
  // });
  // }

  log(){
    this.data.getCompanyCheck(this.user).subscribe(
      {
  next: (response: any)=>{
  this.error="",
  this.message="";
      if (response.length==1){
        localStorage.setItem("infoCompany",JSON.stringify(response[0]));

        this.router.navigate(["/dashCompany/"]).then(() => {
          window.scrollTo(0, 0)
        });
        console.log(response)

      }
      else{
        console.log("try again");
      }
  console.log(response);
  },
  error:(error: any) =>{
  this.message="",
  this.check=true
  this.user.email=""
  this.user.password=""
  this.error=error
  },
  complete:()=>{}
  }
  )
    //3
  }




  moveToUser(){
    this.router.navigate(["/logIn/"]).then(() => {
      window.scrollTo(0, 0)
    });
  }
  moveToCompany(){
    this.router.navigate(["/logInCompany/"]).then(() => {
      window.scrollTo(0, 0)
    });
  }

}
