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
import { DocumentData } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  postsCollection: CollectionReference<DocumentData>;

  constructor(public firestore: Firestore, public fbStorage: Storage) {
    this.postsCollection = collection(this.firestore, 'posts');
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(this.fbStorage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  addPost(post): Promise<DocumentReference> {
    return addDoc(collection(this.firestore, 'posts'), post);
  }
  getPosts(): Observable<DocumentData[]> {
    return collectionData(this.postsCollection);
  }
}
