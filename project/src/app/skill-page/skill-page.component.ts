import { Component,OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { DataService } from '../data.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-page',
  templateUrl: './skill-page.component.html',
  styleUrls: ['./skill-page.component.css']
})
export class SkillPageComponent implements OnInit{
myForm:any;
information:any
users={
  id:"",
  name:"",
  email:"",
  phone:"",
  password:"",  }
  skills:any=[]
  checker=false
constructor(private formBuilder:FormBuilder, private data: DataService, private route:Router){

}

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
  this.data.getSkillId(parseInt(this.users.id)).subscribe(
    (response)=>{ this.skills= response

    }
  )

  this.myForm= this.formBuilder.group({
    name: ['',Validators.required],
    user_id:[this.users.id],
    level: ['',[Validators.required, Validators.max(100)]]})
}
onSubmit(){
  this.checker=true;
  if(this.myForm.valid){
this.data.addSkill(this.myForm.value).subscribe();
window.location.reload()}
}

deleteSkill(skill_id:number){
  this.data.deleteSkill(skill_id).subscribe();
  window.location.reload();
}

}
