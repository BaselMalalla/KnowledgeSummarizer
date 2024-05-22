// Make ui for more than one image for each summary
// Make ui for (specific for books) when there is more than one summary for each book

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Rating } from '../shared/interfaces';
import { DataQueryService } from '../data-query.service';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

interface Comment {
  id: number;
  username: string;
  content: string;
  date: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  // post: any;
  personalRating: number = 0;
  userLiked: boolean = false;
  newComment: string = '';
  comments: Comment[] = [
    {
      id: 1,
      username: 'user1',
      content: 'Great post!',
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      username: 'user2',
      content: 'Thanks for sharing!',
      date: new Date().toLocaleDateString(),
    },
  ];

  // posts = [
  //   {
  //     id: 1,
  //     title: 'Ionic 4 Tutorial',
  //     type: 'article',
  //     username: 'mrmaradi',
  //     content:
  //       'This is a tutorial on Ionic 4. Ionic 4 is a powerful framework for building cross-platform mobile applications using web technologies such as HTML, CSS, and JavaScript. It provides a wide range of UI components, native device features integration, and seamless performance. With Ionic 4, developers can create beautiful and highly functional mobile apps that run on iOS, Android, and the web. This tutorial will guide you through the process of getting started with Ionic 4, exploring its key features, and building your first mobile app.',
  //     likeCount: 50,
  //     rating: 4.2,
  //     topics: ['Angular', 'Ionic', 'Web Development'],
  //     date: new Date().toLocaleDateString(),
  //     image: 'https://www.techiediaries.com/modern-angular.webp',
  //   },
  //   {
  //     id: 2,
  //     title: 'Another Post',
  //     type: 'blog',
  //     username: 'johndoe',
  //     content: 'Content of another post...',
  //     likeCount: 30,
  //     rating: 3.7,
  //     topics: ['React', 'JavaScript'],
  //     date: new Date().toLocaleDateString(),
  //     image: 'https://www.techiediaries.com/modern-angular.webp',
  //   },
  // ];
  public post: Observable<Post[]>;
  constructor(
    private route: ActivatedRoute,
    private dataQueryService: DataQueryService
  ) {
    this.post = this.dataQueryService.getPost(this.postId);
  }

  postId = '';
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const postId = +params['id'];
    });
  }

  toggleLike() {
    // this.userLiked = !this.userLiked;
    // if (this.userLiked) {
    //   this.post.likeCount++;
    // } else {
    //   this.post.likeCount--;
    // }
  }

  setPersonalRating(rating: number) {
    this.personalRating = rating;
  }

  addComment() {
    if (this.newComment.trim()) {
      const newComment: Comment = {
        id: this.comments.length + 1,
        username: 'currentUser', // Replace with actual username
        content: this.newComment,
        date: new Date().toLocaleDateString(),
      };
      this.comments.push(newComment);
      this.newComment = '';
    }
  }
}
