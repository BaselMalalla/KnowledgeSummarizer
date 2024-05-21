import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router:Router) { }
  postid: number = 1;
  content: string = 'This is a tutorial on Ionic 4. Ionic 4 is a powerful framework for building cross-platform mobile applications using web technologies such as HTML, CSS, and JavaScript. It provides a wide range of UI components, native device features integration, and seamless performance. With Ionic 4, developers can create beautiful and highly functional mobile apps that run on iOS, Android, and the web. This tutorial will guide you through the process of getting started with Ionic 4, exploring its key features, and building your first mobile app.';
  type:string = 'article';
  username:string = 'mrmaradi';  
  bio:string = 'I am a software developer and a tech blogger';
  posts:number = 100;
  likes:number = 1000;
  following:number = 100;
  email = 'mrmaradi@gmail.com';
  date: Date = new Date();
  topics: string[] = ['Angular', 'React', 'Vue', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SASS', 'LESS'];
   title: string = 'ionic 4 tutorial';
   summary: string = 'This is a tutorial on ionic 4';
   image: string = 'https://www.techiediaries.com/modern-angular.webp';
   likeCount: number = 50;
  rating: number = 6;
  stars: number[] = [1, 2, 3, 4, 5];
  ngOnInit() {
  }

  //methods
  /*
    likePost() {
      this.likeCount++;
      // Logic to handle like action (e.g., send request to server)
    } */
   
    goToDetails(){
      this.router.navigate(['/post']);
    }
 
}
