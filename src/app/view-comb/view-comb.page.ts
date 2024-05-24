import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../shared/interfaces';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { CombService } from '../services/comb.service';
import { PostService } from '../services/post.service';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-view-comb',
  templateUrl: './view-comb.page.html',
  styleUrls: ['./view-comb.page.scss'],
})
export class ViewCombPage implements OnInit {
  // Imported functions
  convertFirebaseDate = convertFirebaseDate;
  calculateRatingsAvg = calculateRatingsAvg;
  extractedSummaries: string[] = [];
  combinedSummary: string = '';
  public posts: any[] = [];
  selectedIcon="close-circle-outline";
  constructor(
    private router: Router,
    private postService: PostService,
    private combService: CombService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.postService.getPostsCopy();
    this.posts = this.postService.posts;
  }

  async ionViewWillEnter() {
    await this.postService.getPostsCopy();
    this.posts = this.postService.posts;
    if(!this.extractedSummaries)
    this.posts.forEach((post) => {
      post.isSelected = false; // Initialize disabled property
    });
  }

  goToDetails(postId: string | undefined) {
    this.router.navigate(['/post'], {
      queryParams: { id: postId },
    });
  }

  selectUnselectSummary(selectedSummary: string, post: Post) {
    post.isSelected = !post.isSelected;
    if (post.isSelected) {
      this.extractedSummaries.push(selectedSummary);
      this.selectedIcon="close-circle-outline";
    } else {
      this.extractedSummaries = this.extractedSummaries.filter(
        (summary) => summary !== selectedSummary
      );
    }
    console.log(this.extractedSummaries, 'select/unselect', post.isSelected);
  }

  compineSummary() {
    this.combService.combinedSummary[0] = this.extractedSummaries.join('\n');
    this.extractedSummaries = [];
    this.router.navigate(['/new-post']);
  }
  
  deSelectAll(){
    this.extractedSummaries = [];
    this.posts.forEach((post) => {
      post.isSelected = false})
      if(!this.extractedSummaries){
        this.selectedIcon="checkmark-circle";
      }
      
      
  }
}
