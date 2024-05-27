import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent {
  myForm:any;


  constructor(private formBuilder: FormBuilder,private data: DataService,private router:Router){}

  ngOnInit(): void {

    this.myForm= this.formBuilder.group({
      name: ['',Validators.required],
      phone: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      location:['',Validators.required]
      //user_id
    })
}
onSubmit(){
  if(this.myForm.valid){
 this.data.addCompany(this.myForm.value).subscribe();
console.log(this.myForm.value)
this.myForm= this.formBuilder.group({
  name: ['',Validators.required],
  phone: ['',Validators.required],
  email: ['',Validators.required],
  password: ['',Validators.required],
  location:['',Validators.required]
  //user_id
})
this.router.navigate(["/logInCompany/"]).then(() => {window.scrollTo(0, 0)});
  }
// this.router.navigate(["/logInCompany/"]).then(() => {
//   window.scrollTo(0, 0)
// });
}

goBack(){
  this.router.navigate(["/logInCompany/"]).then(() => {
    window.scrollTo(0, 0)
  });
}


}
