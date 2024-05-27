import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
informationCompany:any;
informationUser:any
jobs:any
job:any[]=[];
constructor(private data: DataService){}

ngOnInit(): void {
  this.data.getAllCompany().subscribe( (response)=>{this.informationCompany=response})
  this.data.getAllUser().subscribe((response)=>{this.informationUser=response})
  this.data.getJobs().subscribe((response)=>{this.jobs=response
  this.jobs.forEach((j:any)=>{
    console.log(j.status)
    if(j.status===0){ this.job.push(j)}

  })
  })
}
deleteCompany(i:number){
this.data.deleteCompany(i).subscribe();
window.location.reload()

}


deleteUser(i:number){
this.data.deleteUser(i).subscribe(
);
window.location.reload()
}

delete(job_id:number){
  this.data.deleteJob(job_id).subscribe();
  window.location.reload()
  }

 updateStatus(job_id:number){
  this.data.updateStatusJob(job_id).subscribe();
  window.location.reload();
 }
}
