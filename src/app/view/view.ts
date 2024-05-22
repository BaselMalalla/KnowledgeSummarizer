import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Rating } from '../shared/interfaces';
import { DataQueryService } from '../data-query.service';
import { Observable } from 'rxjs';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  // imported functions
  convertFirebaseDate = convertFirebaseDate;
  calculateRatingsAvg = calculateRatingsAvg;

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
}
