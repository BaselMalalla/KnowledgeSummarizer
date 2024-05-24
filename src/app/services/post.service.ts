// @ts-nocheck
import { Injectable } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

// AngularFire
import {
  collection,
  collectionData,
  CollectionReference,
  DocumentReference,
} from '@angular/fire/firestore';
import {
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  docData,
  setDoc,
  addDoc,
  query,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { Observable, map } from 'rxjs';
import { Post } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  isPostReadByUser(readBy: string[] | undefined, userId: string): boolean {
    throw new Error('Method not implemented.');
  }
  // 1. Object
  post: Post = {
    id: '',
    authorId: '',
    type: '',
    topics: [],
    title: '',
    date: new Date(),
    detailsArray: [
      {
        summary: '',
        images: [],
      },
    ],
    likedBy: [],
    comments: [
      {
        content: '',
        userId: '',
      },
    ],
    ratings: [
      {
        userId: '',
        value: 0,
      },
    ],
  };

  // 2. Array of any
  public posts: any[] = [];

  // 3. Observable array of Users
  public posts$: Observable<User[]>;

  // 4. Collection reference
  postCollection: CollectionReference<DocumentData>;

  constructor(public firestore: Firestore, public fbStorage: Storage) {
    // get a reference to the posts collection
    this.postCollection = collection(this.firestore, 'posts');

    this.getPosts(); // get posts as observable
    this.getPostsCopy(); // get posts by copy into array
  }
  async getPosts() {
    const q = query(collection(this.firestore, 'Courses'));
    this.posts$ = collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }
  async getPostsCopy() {
    this.posts = [];
    const querySnapshot = await getDocs(collection(this.firestore, 'posts'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      this.posts.push({ id: doc.id, ...doc.data() } as Post);
    });
  }
  async getPost(id) {
    const docRef = doc(this.firestore, 'posts', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
      s;
    } else {
      console.log('No such document!');
    }
  }

  updatePost(post: Post): Promise<DocumentReference> {
    const docRef = doc(this.firestore, 'posts', post.id);

    return updateDoc(docRef, {
      authorId: post.authorId,
      comments: post.comments,
      date: post.date,
      detailsArray: post.detailsArray,
      likedBy: post.likedBy,
      ratings: post.ratings,
      title: post.title,
      topics: post.topics,
      type: post.type,
    });
  }

  deletePost(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'posts', id));
  }

  isPostLikedByUser(likedBy: string[], userId: string): boolean {
    return likedBy.includes(userId);
  }

  isPostLikedByUser(readBy: string[], userId: string): boolean {
    return readBy.includes(userId);
  }

  getTotalLikes(posts: Post[]): number {
    return posts.reduce((acc, post) => acc + post.likedBy.length, 0);
  }

  getAllTopics(): string[] {
    const topics = new Set<string>();
    this.posts.forEach((post) =>
      post.topics.forEach((topic) => topics.add(topic))
    );
    return Array.from(topics);
  }
}
