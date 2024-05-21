import { Component, ElementRef, OnInit, Renderer2, ViewChildren, QueryList, AfterViewInit, ViewChild } from '@angular/core';
import { GestureController, IonCard, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, AfterViewInit {
  @ViewChildren(IonCard, { read: ElementRef }) cards!: QueryList<ElementRef>;
  @ViewChild('trashCan', { read: ElementRef }) trashCan!: ElementRef;

  username: string = 'mrmaradi';
  bio: string = 'I am a software developer and a tech blogger';
  postCount: number = 100;  // Renamed this property to avoid conflict
  likes: number = 1000;
  posts: { 
    id: number; 
    title: string; 
    type: string; 
    username: string; 
    content: string; 
    likeCount: number; 
    rating: number; 
    topics: string[]; 
    date: string; 
    image: string; 
  }[] = [
    {
      id: 1,
      title: 'Ionic 4 Tutorial',
      type: 'article',
      username: 'mrmaradi',
      content: 'This is a tutorial on Ionic 4...',
      likeCount: 50,
      rating: 4,
      topics: ['Angular', 'Ionic', 'Web Development'],
      date: new Date().toLocaleDateString(),
      image: 'https://www.techiediaries.com/modern-angular.webp'
    },
    {
      id: 2,
      title: 'Another Post',
      type: 'blog',
      username: 'johndoe',
      content: 'Content of another post...',
      likeCount: 30,
      rating: 3,
      topics: ['React', 'JavaScript'],
      date: new Date().toLocaleDateString(),
      image: 'https://www.techiediaries.com/modern-angular.webp'
    }
  ];

  constructor(private gestureCtrl: GestureController, private renderer: Renderer2, private router: Router, private platform: Platform) {}

  ngOnInit() {}

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
    this.renderer.setStyle(cardElement, 'transform', `translate(${ev.deltaX}px, ${ev.deltaY}px)`);
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
    this.router.navigate(['/post'], {
      queryParams: {
        id: postId
      }
    });
  }
}
