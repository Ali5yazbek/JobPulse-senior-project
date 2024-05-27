import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
CompanyId:number=1;
jobName:string=''
myForm:any;
information:any;
users={
  id:"",
  name:"",
  email:"",
  phone:"",
  password:"",  }

  now=new Date();
constructor(private formBuilder: FormBuilder,private data: DataService,private router:Router){}

  ngOnInit(): void {
    if(localStorage.getItem('info')){}else{this.router.navigate(["/logIn/"]).then(() => {window.scrollTo(0, 0)});}

    const id= localStorage.getItem('JobItem');
    const n = localStorage.getItem('JobName');

    if(n){
      this.jobName= JSON.parse(n)
      console.log(this.jobName," ggg")
    }

    console.log("the id: ",id)
    if(id){
      this.CompanyId= JSON.parse(id)
      console.log("company id: ",this.CompanyId)
    }

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

 ////////////


this.myForm= this.formBuilder.group({
  status:["false"],
  appliedDate:[this.now.toLocaleDateString()],
  userName: [this.users.name,Validators.required],
  jobName: [this.jobName,Validators.required],
  phone: [this.users.phone,Validators.required],
  email:[this.users.email,Validators.required],
  Description:['',Validators.required],
  company_id:[this.CompanyId],
  user_id:[this.users.id]
})


}


// onFileChange(event: any): void {
//   const file = (event.target as HTMLInputElement).files?.[0];

//   if (file) {
//     this.myForm.patchValue({
//       cv: file,
//     });
//   }
// }

get f(){
return this.myForm.controls
}
onSubmit(){
 console.log(this.myForm.value)
 this.data.Apply(this.myForm.value).subscribe();

 this.myForm= this.formBuilder.group({
  status:["false"],
  appliedDate:[this.now.toLocaleDateString()],
  userName: [this.users.name,Validators.required],
  jobName: ['',Validators.required],
  phone: [this.users.phone,Validators.required],
  email:[this.users.email,Validators.required],
  Description:['',Validators.required],
  company_id:[this.CompanyId],
  user_id:[this.users.id]
})
this.router.navigate(["/home/"]).then(() => {
  window.scrollTo(0, 0)
});
}
}
