import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { }
  email = 'mrmaradi@gmail.com';
  topics: string[] = ['Angular', 'React', 'Vue', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SASS', 'LESS'];
   title: string = 'ionic 4 tutorial';
   summary: string = 'This is a tutorial on ionic 4';
   image: string = 'https://www.techiediaries.com/modern-angular.webp';
  ngOnInit() {
  }
}
