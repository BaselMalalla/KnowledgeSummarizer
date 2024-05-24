// Needs to update the page manually (use observable maybe?)

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Rating } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements ViewWillEnter, OnInit {
  // imported functions
  convertFirebaseDate = convertFirebaseDate;
  calculateRatingsAvg = calculateRatingsAvg;

  public posts: any[] = [];
  constructor(
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ) {}
  async ngOnInit(): Promise<void> {
    // await this.postService.getPostsCopy();
    // this.posts = this.postService.posts;
  }
  async ionViewWillEnter() {
    await this.postService.getPostsCopy();
    this.posts = this.postService.posts;
  }
  goToDetails(postId: string | undefined) {
    this.router.navigate(['/post-details'], {
      queryParams: { id: postId },
    });
  }

  getUsernameById(userId: string): string {
    return this.userService.getUsernameById(userId);
  }
}
