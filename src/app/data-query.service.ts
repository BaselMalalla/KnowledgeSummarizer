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

  async getPost(id) {
    const docRef = doc(this.firestore, 'posts', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
    }
  }

  async deletePost(id) {
    const docRef = doc(this.firestore, 'posts', id);
    await deleteDoc(docRef, data);
    console.log('Document successfully deleted!');
  }

  async updatePost(id, data) {
    const docRef = doc(this.firestore, 'posts', id);
    await updateDoc(docRef, data);
    console.log('Document successfully updated!');
  }

  // async getUser(userId: string) {
  //   q = query(
  //     collection(this.firestore, 'users'),
  //     where('userId', '==', userId)
  //   );
  //   const docSnap = await getDoc(q);
  //   if (docSnap.exists()) {
  //     console.log('Document data:', docSnap.data());
  //     return docSnap.data();
  //   } else {
  //     console.log('No such document!');
  //   }
  // }

  async getUser(userId: string) {
    return new Promise(async (resolve, reject) => {
      const q = query(
        collection(this.firestore, 'Users'),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc: any) => {
        resolve(doc.data());
      });
    });
  }
}
