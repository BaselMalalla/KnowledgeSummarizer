// @ts-nocheck
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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

@Injectable({
  providedIn: 'root',
})
export class DataQueryService {
  constructor(public firestore: Firestore, public fbStorage: Storage) {}

  getPosts(): Observable<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    return collectionData(postsCollection, { idField: 'id' }).pipe(
      map((posts) => posts as Post[])
    );
  }
  // getPost(id: string): Observable<Post> {
  //   console.log(id);
  //   const postDocRef = doc(this.firestore, id);
  //   return docData(postDocRef, { idField: 'id' }).pipe(
  //     map((post) => post as Post)
  //   );
  // }

  // getPost(id: string): Observable<Post> {
  //   const document = doc(this.firestore, `posts/id`);
  //   return docSnapshots(document).pipe(
  //     map((doc) => {
  //       const id = doc.id;
  //       const data = doc.data();
  //       return { id, ...data } as Post;
  //     })
  //   );
  // }

  getPost(id: string): Observable<Post> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('__name__', '==', id));
    return collectionData(q, { idField: 'id' }).pipe(
      map((posts) => (posts.length ? (posts[0] as Post) : null))
    );
  }
  // getPost(id): Observable<Post> {
  //   const noteDocRef = doc(this.firestore, `posts/${id}`);
  //   return docData(noteDocRef, { idField: 'id' }) as Observable<Post>;
  // }

  // async getDocument(id: string) {
  //   const docSnap = await getDoc(doc(this.firestore, 'posts', id));
  //   return docSnap;
  // }
}
