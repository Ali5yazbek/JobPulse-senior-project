import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
myForm:any;


  constructor(private formBuilder: FormBuilder,private data: DataService,private router:Router){}

  ngOnInit(): void {

this.myForm= this.formBuilder.group({
  email: ['',Validators.required],
  password: ['',Validators.required],
  name: ['',Validators.required],
  phoneNumber: ['',Validators.required],
  isCompany:['false',Validators.required]
  //user_id
})
}
onSubmit(){
 this.data.addUser(this.myForm.value).subscribe();
console.log(this.myForm.value)
this.myForm= this.formBuilder.group({
  email: ['',Validators.required],
  password: ['',Validators.required],
  name: ['',Validators.required],
  phoneNumber: ['',Validators.required],
  isCompany:['false',Validators.required]
  //user_id
})

this.router.navigate(["/logIn/"]).then(() => {
  window.scrollTo(0, 0)
});
}


}
