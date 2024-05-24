// @ts-nocheck
import { Injectable } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
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
  where,
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

  constructor(
    public firestore: Firestore,
    public fbStorage: Storage,
    public auth: Auth
  ) {
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

  async updateUser(user: User): Promise<void> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('userId', '==', user.userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userDocRef = doc(this.firestore, 'users', userDoc.id);

      await updateDoc(userDocRef, {
        username: user.username,
        bio: user.bio,
      });

      console.log('User updated successfully');
    } else {
      console.error('User not found');
    }
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
  getBioById(userId: string): string {
    let bio = '';
    this.users.forEach((user) => {
      if (user.userId === userId) {
        bio = user.bio;
      }
    });
    return bio;
  }
  getCurrentUserId(): string {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      return '';
    }
  }
}
