import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit{
  private users:any;
  user = {
   email: '',
   password: ''
 };
 error:string=""
 message:string=""
 check=false
constructor(private router:Router, private data: DataService){}

// log(){
//   this.data.getUser(this.user).subscribe(
//     (response: any)=>{

//     if (response.length==1){
//       localStorage.setItem("info",JSON.stringify(response[0]));

//       console.log(response);
//       this.router.navigate(["/home/"]).then(() => {
//         window.scrollTo(0, 0)
//       });

//     } else{
//       console.log("try again");

//     }

// },

// );
// }
ngOnInit():void{
  localStorage.removeItem('info')

}

log(){
  this.data.getUser(this.user).subscribe(
    {
next: (response: any)=>{
this.error="",
this.message="";
    if (response.length==1){
      localStorage.setItem("info",JSON.stringify(response[0]));
              if(response[0].isCompany=="true"){
          this.router.navigate(["/adminPage/"]).then(() => {
            window.scrollTo(0, 0)})
        }
        else{
          this.router.navigate(["/home/"]).then(() => {
            window.scrollTo(0, 0)
          });
        }



//       console.log(response)

    }
    else{
      console.log("try again");
    }
console.log(response[0].isCompany);
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

