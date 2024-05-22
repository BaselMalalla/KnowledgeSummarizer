import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Rating } from '../shared/interfaces';
import { DataQueryService } from '../data-query.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  public posts: Observable<Post[]>;
  constructor(
    private router: Router,
    private dataQueryService: DataQueryService
  ) {
    this.posts = this.dataQueryService.getPosts();
  }
  ngOnInit(): void {
    console.log(this.posts);
  }
  goToDetails(postId: string | undefined) {
    this.router.navigate(['/post'], {
      queryParams: { id: postId },
    });
  }
  calculateRatingAvg(ratings: Rating[]): number {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const total = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return total / ratings.length;
  }

  convertDate(timestamp: any): string {
    const { seconds, nanoseconds } = timestamp;
    console.log(seconds, nanoseconds);
    const fireBaseTime = new Date(seconds * 1000 + nanoseconds / 1000000);
    const dateString = fireBaseTime.toDateString();
    const atTime = fireBaseTime.toLocaleTimeString();

    return dateString;
  }
}
