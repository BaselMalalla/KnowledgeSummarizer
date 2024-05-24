// Make ui for more than one image for each summary
// Make ui for (specific for books) when there is more than one summary for each book

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, User, Rating, Comment } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { DocumentData } from 'firebase/firestore';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  public users!: Observable<User[]>;
  constructor(
    private route: ActivatedRoute,
    public auth: Auth,
    private userService: UserService,
    private postService: PostService
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
  usersArray: any[] = [];

  public post!: Post;
  postId!: string | null;

  ngOnInit() {
    console.log();
  }

  ionViewWillEnter() {
    this.userId = this.getCurrentUserId();
    this.loadPost();
    this.usersArray = this.userService.users;
    console.log(this.usersArray, 'from ionViewWillEnter');
  }

  async loadPost() {
    if (this.postId) {
      const doc = await this.postService.getPost(this.postId);
      this.post = this.accessPostParts(doc) as Post;
      console.log(this.post, 'from loadPost');
    }
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
    this.updatePost();
  }
  setPersonalRating(star: number) {
    let rating = this.post.ratings.find((r) => r.userId === this.userId);
    if (rating) {
      rating.value = star;
    } else {
      this.post.ratings.push({ userId: this.userId, value: star });
    }
    this.updatePost();
  }

  getUsernameById(userId: string): string {
    return this.userService.getUsernameById(userId);
  }

  accessPostParts(document: any): Post {
    const {
      id,
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
      id,
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
    console.log(this.post.id);
    this.updatePost();
  }

  updatePost() {
    this.postService
      .updatePost(this.post)
      .then((res) => {
        console.log('Member record has been updated successfully', res);
      })
      .catch((err) => {
        console.log('Failed to update member record', err);
      });
  }
}
