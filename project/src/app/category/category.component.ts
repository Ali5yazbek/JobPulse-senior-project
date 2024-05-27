import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  array1:any=[
    {id:1,path:"../../assets/images/computer-svgrepo-com.svg",name:"CS"},
    {id:2,path:"../../assets/images/crypto-prices-svgrepo-com.svg",name:"crypto"},
    {id:3,path:"../../assets/images/design-svgrepo-com.svg",name:"Graphic"},
    {id:4,path:"../../assets/images/engineering-helmet-cog-svgrepo-com (1).svg",name:"engeneering"},

    ]
    constructor(private router:Router){}


    moveTo(id:number){
      localStorage.setItem("categoryId",JSON.stringify(id))
      this.router.navigate(["/job/"]).then(() => {
        window.scrollTo(0, 0)
        window.location.reload();
      });
      }

}
