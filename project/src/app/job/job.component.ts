import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { response } from 'express';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
jobs1:any;
  // {id:1,title:'engineer',discription:"sdasdas das dasd as",salary:"100",skill:"html/css",postDate:"12/29/2023",company_id:1,admin_id:1,category_id:1,location:"beirut",time:"part time"},
  // {id:2,title:'IT software',discription:"sdasdas das dasd as",salary:"100",skill:"html/css",postDate:"12/29/2023",company_id:1,admin_id:1,category_id:2,location:"saida",time:"full time"},
  // {id:3,title:'full stack',discription:"sdasdas das da",salary:"1000",skill:"html/css",postDate:"12/29/2023",company_id:2,admin_id:1,category_id:3,location:"beirut",time:"part time"}
jobAccept: any[]=[]
jobCopy:any;
categoryId:number=0
constructor(private router:Router,private data:DataService)
{

}
ngOnInit(): void {



  const cID= localStorage.getItem('categoryId');
  console.log("the categoryID: ",cID)
    if(cID){
      try{
    this.categoryId= JSON.parse(cID);
    this.data.getJobCategory(this.categoryId).subscribe( (response)=>{
      this.jobs1=response;
      this.jobs1.forEach((j:any)=>{
        if(j.status===1){
          this.jobAccept.push(j)
          console.log("the jobAccept: ",this.jobAccept)
        }
      })
    })
    console.log(this.categoryId)
 //   this.jobCopy=this.jobs1?.filter( (item: { category_id: number; })=> item.category_id === this.categoryId)
  //      console.log("the copy:",this.jobCopy)
      }catch(error){
        console.error('Error parsing JSON from localStorage:', error);
      }
  }
}
// fetchJob(){
//   this.data.getJobs().subscribe(
//     (response) => {
//     this.jobs1 = response
//     this.jobs1.forEach((j:any)=>{
//       if(j.status=1){
//         this.jobAccept.push(j)
//         console.log(this.jobAccept)
//       }
//     })

//   })
// }

moveToWithId(id:number,title:string){
  localStorage.setItem('JobItem',JSON.stringify(id));
  localStorage.setItem('JobName',JSON.stringify(title));
this.router.navigate(["/apply/"]).then(() => {
  window.scrollTo(0, 0)
});
}
}
