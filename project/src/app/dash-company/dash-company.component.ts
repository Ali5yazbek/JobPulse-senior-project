import { Component,OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-company',
  templateUrl: './dash-company.component.html',
  styleUrls: ['./dash-company.component.css']
})
export class DashCompanyComponent implements OnInit {
jobs:any;
information:any
constructor(private data:DataService, private route: Router){}

ngOnInit(): void {
if(localStorage.getItem('infoCompany')){this.route.navigate(["/dashCompany/"]).then(() => {window.scrollTo(0, 0)});}else{this.route.navigate(["/logIn/"]).then(() => {window.scrollTo(0, 0)});}

  const info= localStorage.getItem('infoCompany')
if(info){
this.information = JSON.parse(info)
}

  this.data.getJobCompanyId(this.information.company_id).subscribe( (response)=>{this.jobs=response})
}

delete(job_id:number){
this.data.deleteJob(job_id).subscribe();
window.location.reload()
}

}
