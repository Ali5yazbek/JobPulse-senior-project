import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {
myForm:any
now=new Date();
information:any
constructor(private formBuilder: FormBuilder,private data: DataService,private route:Router){}

ngOnInit(): void {
const info= localStorage.getItem("infoCompany")
if(info){
this.information= JSON.parse(info)
}

  this.myForm= this.formBuilder.group({
    title: ['',Validators.required],
    description:['',Validators.required],
    salary: ['',Validators.required],
    skills: ['',Validators.required],
    postDate:[this.now.toLocaleDateString()],
    company_id: [this.information.company_id],
    admin_id:[2],
    category_id:[1],
    location: ['',Validators.required],
    time:['',Validators.required],
    status:[0]

  })
  }

onSubmit(){
  if(this.myForm.valid){
 this.data.addJob(this.myForm.value).subscribe(
  ()=>{ console.log("job added!"); },
  (error) => {
    console.error('Error adding job:', error);
  }

)

this.myForm= this.formBuilder.group({
  title: ['',Validators.required],
  description:['',Validators.required],
  salary: ['',Validators.required],
  skills: ['',Validators.required],
  postDate:[this.now.toLocaleDateString()],
  company_id: [1],
  admin_id:[1],
  category_id:[1],
  location: ['',Validators.required],
  time:['',Validators.required],
  status:[0]
})

this.route.navigate(["/dashCompany/"]).then(() => {window.scrollTo(0, 0)});


}
  // console.log(now.toLocaleDateString())
}



}

