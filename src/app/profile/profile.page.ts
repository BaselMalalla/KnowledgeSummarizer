import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  ViewWillLeave,
  ViewDidLeave,
  ViewWillEnter,
  ViewDidEnter,
} from '@ionic/angular';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Post, Rating } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { convertFirebaseDate, calculateRatingsAvg } from '../shared/utils';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements ViewWillEnter, AfterViewInit, ViewDidLeave {
  @ViewChildren(IonCard, { read: ElementRef }) cards!: QueryList<ElementRef>;
  @ViewChild('trashCan', { read: ElementRef }) trashCan!: ElementRef;

  convertFirebaseDate = convertFirebaseDate;
  calculateRatingsAvg = calculateRatingsAvg;
  public posts: any[] = [];
  public userPosts: any[] = [];
  username: string = '';
  bio: string = '';
  postsCount: number = 0;
  likesCount: number = 0;

  constructor(
    private gestureCtrl: GestureController,
    private renderer: Renderer2,
    private router: Router,
    private platform: Platform,
    private postService: PostService,
    private userService: UserService
  ) {}

  // async ngOnInit(): Promise<void> {
  //   // await this.postService.getPostsCopy();
  //   // this.posts = this.postService.posts;
  //   // this.userPosts = this.getUserPosts();
  //   // this.username = this.userService.getUsernameById(
  //   //   this.userService.getCurrentUserId()
  //   // );
  //   // this.bio = this.userService.getBioById(this.userService.getCurrentUserId());
  //   // this.postsCount = this.userPosts.length;
  //   // this.likesCount = this.postService.getTotalLikes(this.userPosts);
  // }

  async ionViewWillEnter() {
    await this.postService.getPostsCopy();
    this.posts = this.postService.posts;
    this.userPosts = this.getUserPosts();
    console.log(this.userPosts, 'userPosts from ionViewWillEnter');
    this.username = this.userService.getUsernameById(
      this.userService.getCurrentUserId()
    );
    this.bio = this.userService.getBioById(this.userService.getCurrentUserId());
    this.postsCount = this.userPosts.length;
    this.likesCount = this.postService.getTotalLikes(this.userPosts);
  }
  ionViewDidLeave(): void {
    this.cleanupTask();
  }
  getUserPosts(): Post[] {
    console.log(this.posts, 'posts from getUserPosts');
    return this.posts.filter(
      (post) => post.authorId === this.userService.getCurrentUserId()
    );
  }
  getUsernameById(userId: string): string {
    return this.userService.getUsernameById(userId);
  }

  ngAfterViewInit() {
    this.cards.forEach((card, index) => {
      const gesture = this.gestureCtrl.create({
        el: card.nativeElement,
        gestureName: 'drag',
        onStart: () => {
          this.renderer.addClass(card.nativeElement, 'dragging');
        },
        onMove: (ev) => this.onMove(ev, card.nativeElement),
        onEnd: (ev) => this.onEnd(ev, card.nativeElement, index),
      });
      gesture.enable();
    });
  }

  onMove(ev: any, cardElement: HTMLElement) {
    this.renderer.setStyle(
      cardElement,
      'transform',
      `translate(${ev.deltaX}px, ${ev.deltaY}px)`
    );
  }

  onEnd(ev: any, cardElement: HTMLElement, index: number) {
    const trashCanBounds = this.trashCan.nativeElement.getBoundingClientRect();
    const cardBounds = cardElement.getBoundingClientRect();

    if (
      cardBounds.right > trashCanBounds.left &&
      cardBounds.left < trashCanBounds.right &&
      cardBounds.bottom > trashCanBounds.top &&
      cardBounds.top < trashCanBounds.bottom
    ) {
      this.renderer.setStyle(cardElement, 'transition', '0.3s ease-out');
      this.renderer.setStyle(cardElement, 'transform', `translateX(100%)`);
      setTimeout(() => {
        this.deleteCard(index);
      }, 300);
    } else {
      this.renderer.removeClass(cardElement, 'dragging');
      this.renderer.setStyle(cardElement, 'transition', '0.3s ease-out');
      this.renderer.setStyle(cardElement, 'transform', `translate(0, 0)`);
    }
  }

  deleteCard(index: number) {
    this.posts.splice(index, 1);
  }

  goToDetails(postId: number) {
    this.router.navigate(['/post-details'], {
      queryParams: {
        id: postId,
      },
    });
  }

  cleanupTask() {
    this.posts = [];
    this.userPosts = [];
    this.username = '';
    this.bio = '';
    this.postsCount = 0;
    this.likesCount = 0;
    console.log('cleanupTask');
  }
}
