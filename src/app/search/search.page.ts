import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  convertFirebaseDate = convertFirebaseDate;
  calculateRatingsAvg = calculateRatingsAvg;

  public posts: Post[] = [];
  public filteredPosts: Post[] = [];

  ratingRange: any = {
    lower: 0,
    upper: 5,
  };
  minRating: number = 0;
  maxRating: number = 5;
  filterForm: FormGroup;
  searchitem = '';

  constructor(
    public firebaseService: FirebaseService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
    private postService: PostService,
    private userService: UserService
  ) {
    this.posts = this.postService.posts;
    this.filteredPosts = this.posts;
    this.filterForm = this.fb.group({
      isRead: ['', [Validators.required]],
      topics: [[], [Validators.required]],
    });
  }

  Search() {
    const searchTerm = this.searchitem.toLowerCase();
    this.filteredPosts = this.posts.filter((post) => {
      return post.title.toLowerCase().startsWith(searchTerm);
    });
  }

  clearAll() {
    this.searchitem = '';
    this.ratingRange = { lower: 0, upper: 5 };
    this.filterForm.reset();
    this.filteredPosts = this.posts; // Reset to original posts
  }

  applyFilter() {
    const { isRead, topics } = this.filterForm.value;
    let selectedTopics: string[] = [];

    if (topics) {
      selectedTopics = topics;
    }

    console.log('selectedTopics', selectedTopics); // Check if selectedTopics has values

    this.filteredPosts = this.posts.filter((post) => {
      const postRating = this.calculateRatingsAvg(post.ratings);

      const withinRatingRange =
        postRating >= this.ratingRange.lower &&
        postRating <= this.ratingRange.upper;

      const isPostReadByUser = this.postService.isPostReadByUser(
        post.readBy,
        this.userService.getCurrentUserId()
      );
      let matchesReadStatus = true;

      if (isRead === 'Read') {
        matchesReadStatus = post.readBy.length > 0 && isPostReadByUser;
      } else if (isRead === 'Unread') {
        matchesReadStatus = !isPostReadByUser;
      }

      const matchesTopic =
        selectedTopics.length > 0
          ? selectedTopics.some((topic) => post.topics.includes(topic))
          : true;

      console.log(selectedTopics, matchesTopic, 'matchesTopic');

      return withinRatingRange && matchesTopic && matchesReadStatus;
    });

    console.log('Applied Filters:', this.filterForm.value);
  }

  goToDetails(postId: string | undefined) {
    this.router.navigate(['/post-details'], {
      queryParams: { id: postId },
    });
  }

  onRangeChange(event: any) {
    this.minRating = event.detail.value.lower;
    this.maxRating = event.detail.value.upper;
  }

  getUsernameById(userId: string): string {
    return this.userService.getUsernameById(userId);
  }

  getAllTopics(): string[] {
    const topics = new Set<string>();
    this.posts.forEach((post) =>
      post.topics.forEach((topic) => topics.add(topic))
    );
    return Array.from(topics);
  }
}
