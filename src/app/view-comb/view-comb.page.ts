import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post, Rating } from '../shared/interfaces';
import { DataQueryService } from '../data-query.service';
import { Observable } from 'rxjs';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { CombService } from '../comb.service';

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
  combinedSummary: string = "";
  public posts: Observable<Post[]>;

  constructor(
    private router: Router,
    private dataQueryService: DataQueryService,
    private combService: CombService
  ) {
    this.posts = this.dataQueryService.getPosts();
  }

  ngOnInit(): void {
   
  }
  ionViewWillEnter(){
    this.posts.subscribe(posts => {
      posts.forEach(post => {
        post.isSelected = false; // Initialize disabled property
      });
    });
  }

  goToDetails(postId: string | undefined) {
    this.router.navigate(['/post'], {
      queryParams: { id: postId },
    });
  }

  selectsummaries(selectedSummary: string, post: Post) {
    this.extractedSummaries.push(selectedSummary);
    console.log(this.extractedSummaries,"select",post.isSelected);
  }

  compineSummary() {
    this.combService.combinedSummary = this.extractedSummaries.join('\n');
    this.extractedSummaries = [];
    this.router.navigate(['/new-post']);
  }

  toggleCard(post: Post) {
   
    post.isSelected = !post.isSelected;
  }

  SelectUnSelectSummary(selectedSummary: string, post: Post) {
    console.log(post.isSelected);
    if (post.isSelected==true){
      this.selectsummaries(selectedSummary, post) ;
      this.toggleCard(post);
    }
    if (post.isSelected==false){
      this.extractedSummaries = this.extractedSummaries.filter(
      summary => summary !== selectedSummary );
      this.toggleCard(post);
    }
   
    console.log(this.extractedSummaries,"select/unselect",post.isSelected);
  }
}
