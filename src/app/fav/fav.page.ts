import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  posts = [
    {
      id: 1,
      title: 'Ionic 4 Tutorial',
      type: 'article',
      username: 'mrmaradi',
      content: 'This is a tutorial on Ionic 4. Ionic 4 is a powerful framework for building cross-platform mobile applications using web technologies such as HTML, CSS, and JavaScript. It provides a wide range of UI components, native device features integration, and seamless performance. With Ionic 4, developers can create beautiful and highly functional mobile apps that run on iOS, Android, and the web. This tutorial will guide you through the process of getting started with Ionic 4, exploring its key features, and building your first mobile app.',
      likeCount: 50,
      rating: 4.2,
      topics: ['Angular', 'Ionic', 'Web Development'],
      date: new Date().toLocaleDateString(),
      image: 'https://www.techiediaries.com/modern-angular.webp'
    },
    {
      id: 2,
      title: 'Another Post',
      type: 'blog',
      username: 'johndoe',
      content: 'Content of another post...',
      likeCount: 30,
      rating: 3.7,
      topics: ['React', 'JavaScript'],
      date: new Date().toLocaleDateString(),
      image: 'https://www.techiediaries.com/modern-angular.webp'
    }
  ];


  

  goToDetails(postId: number) {
    this.router.navigate(['/post'], {
      queryParams: { id: postId }
    });
  }
}
