// @ts-nocheck
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public firestore: Firestore) {
    this.postsCollection = collection(this.firestore, 'posts');
  }

  postsCollection: CollectionReference<DocumenntData>;

  addPost(post): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'posts'), post);
  }
}
