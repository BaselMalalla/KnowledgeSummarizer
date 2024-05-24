import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Rating } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit, ViewWillEnter {
  convertFirebaseDate = convertFirebaseDate;
  calculateRatingsAvg = calculateRatingsAvg;

  public posts: any[] = [];
  public likedPosts: any[] = [];
  constructor(
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ) {}
  async ngOnInit(): Promise<void> {
    await this.postService.getPostsCopy();
    this.posts = this.postService.posts;
    this.likedPosts = this.getLikedPosts();
    console.log(this.likedPosts, 'likedPosts from ngOnInit');
  }
  async ionViewWillEnter() {
    await this.postService.getPostsCopy();
    this.posts = this.postService.posts;
    this.likedPosts = this.getLikedPosts();
  }
  goToDetails(postId: string | undefined) {
    this.router.navigate(['/post-details'], {
      queryParams: { id: postId },
    });
  }
  getUsernameById(userId: string): string {
    return this.userService.getUsernameById(userId);
  }
  getLikedPosts(): any[] {
    return this.posts.filter((post) =>
      post.likedBy.includes(this.userService.getCurrentUserId())
    );
  }
}
