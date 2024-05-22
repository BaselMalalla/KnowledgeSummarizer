// Make ui for more than one image for each summary
// Make ui for (specific for books) when there is more than one summary for each book

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, User, Rating, Comment } from '../shared/interfaces';
import { DataQueryService } from '../data-query.service';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { ActivatedRoute } from '@angular/router';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataQueryService: DataQueryService,
    public auth: Auth
  ) {
    this.route.queryParams.subscribe((params) => {
      this.postId = params['id'];
    });
    this.userId = this.getCurrentUserId();
  }
  convertFirebaseDate = convertFirebaseDate;
  calculateRatingsAvg = calculateRatingsAvg;

  userId: string;
  personalRating: number = 0;
  userLiked: boolean = false;
  newComment: string = '';

  public post!: Post;
  postId!: string | null;

  ngOnInit() {
    this.userId = this.getCurrentUserId();
  }

  ionViewWillEnter() {
    this.loadPost();
  }

  async loadPost() {
    if (this.postId) {
      alert(this.postId + ' from ionViewWillEnter');
      const doc = await this.dataQueryService.getPost(this.postId);
      this.post = this.accessPostParts(doc) as Post;
      console.log(this.userId);
    }
  }

  accessPostParts(document: any): Post {
    const {
      authorId,
      comments,
      date,
      detailsArray,
      likedBy,
      ratings,
      title,
      topics,
      type,
    } = document;

    return {
      authorId,
      comments,
      date,
      detailsArray,
      likedBy,
      ratings,
      title,
      topics,
      type,
    };
  }

  async getUsernameById(userId: string) {
    const user = await this.getUser(userId);
    return user.username;
  }

  accessUserParts(document: any): User {
    const { username, userId, bio, readPosts } = document;

    return {
      username,
      userId,
      bio,
      readPosts,
    };
  }

  async getUser(userId: string) {
    const doc = await this.dataQueryService.getUser(userId);
    const user = this.accessUserParts(doc) as User;
    console.log(user);
    return user;
  }
  getCurrentUserId(): string {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return '';
    }
  }
  toggleLike() {
    if (this.userId) {
      this.userLiked = !this.userLiked;
      if (this.userLiked) {
        this.post.likedBy.push(this.userId);
      } else {
        this.post.likedBy.pop();
      }
      console.log(this.post.likedBy);
    } else {
      alert('You must be logged in to like a post');
    }
    // Update db
  }
  setPersonalRating(star: number) {
    let rating = this.post.ratings.find((r) => r.userId === this.userId);
    if (rating) {
      rating.value = star;
    } else {
      this.post.ratings.push({ userId: this.userId, value: star });
    }
    // Update db
    // this.postService.updatePost(this.post).subscribe(updatedPost => {
    //   this.post = updatedPost;
    //   this.personalRating = star;
    // });
  }

  getPersonalRating(): number {
    const rating = this.post.ratings.find((r) => r.userId === this.userId);
    return rating ? rating.value : 0;
  }

  addComment() {
    if (this.newComment.trim()) {
      const newCommentObject: Comment = {
        userId: this.getCurrentUserId(),
        content: this.newComment,
      };
      this.post.comments.push(newCommentObject);
      this.newComment = '';
    }
  }
}
