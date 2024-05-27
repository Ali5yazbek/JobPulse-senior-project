import { Component,OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  information:any
  users={
    id:"",
    name:"",
    email:"",
    phone:"",
    password:"",  }
constructor(private data: DataService){}
    ngOnInit():void{
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
}
logOut(){
  localStorage.removeItem('info')
}

updateUser(password:string){
  this.data.updateUser(this.information.userId,password).subscribe();
}

}
