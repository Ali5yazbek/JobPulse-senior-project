import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(private route: Router){}

  ngOnInit(): void {
    if (localStorage.getItem('info')){}else{this.route.navigate(["/logIn/"]).then(() => {window.scrollTo(0, 0)});}
  }

}




