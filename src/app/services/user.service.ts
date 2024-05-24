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
export class UserService {
  // 1. Object
  user: User = { username: '', userId: '', bio: '', readPosts: [] };

  // 2. Array of any
  public users: any[] = [];

  // 3. Observable array of Users
  public users$: Observable<User[]>;

  // 4. Collection reference
  userCollection: CollectionReference<DocumentData>;

  constructor(public firestore: Firestore, public fbStorage: Storage) {
    // get a reference to the users collection
    this.userCollection = collection(this.firestore, 'users');

    this.getUsers(); // get users as observable
    this.getUsersCopy(); // get users by copy into array
  }
  async getUsers() {
    const q = query(collection(this.firestore, 'users'));
    this.users$ = collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }
  async getUsersCopy() {
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      this.users.push(doc.data());
    });
  }
  getUsernameById(userId: string): string {
    let username = 'there is no such user';
    this.users.forEach((user) => {
      if (user.userId === userId) {
        username = user.username;
      }
    });
    return username;
  }
}
