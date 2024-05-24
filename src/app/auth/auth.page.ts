// fix the alert message

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../shared/interfaces';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  signinForm: FormGroup;
  signupForm: FormGroup;
  authSegmentControler: string = 'signin';
  constructor(
    private fb: FormBuilder,
    public firestore: Firestore,
    private firebaseService: FirebaseService,
    public auth: Auth,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.authStateListener();
  }

  authStateListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        this.router.navigate(['/view']);
        alert('welcome user is signed in ');
      } else {
        this.router.navigate(['/auth']);
        alert('user is not signed in please sign in ');
      }
    });
  }
  signin() {
    const auth = getAuth();
    const { email, password } = this.signinForm.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.router.navigate(['/view']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  signout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        this.router.navigate(['/auth']);
        alert('signed out succesfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  signup() {
    const auth = getAuth();
    console.log(auth);
    const { email, password } = this.signupForm.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { username } = this.signupForm.value;
        const userId = user.uid;
        const bio = '';
        const userObj: User = { username, userId, bio };
        this.firebaseService.addUser(userObj);
        this.router.navigate(['/view']);
        alert('signed up succesfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert('signed up failed: ' + errorMessage);
      });
  }
}
