import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendSignInLinkToEmail,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
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
        // User is signed in, redirect to home page
        this.router.navigate(['/home']);
        // alert('welcome user is signed in ');
      } else {
        // No user is signed in, redirect to sign up page
        this.router.navigate(['/auth']);
        // alert('user is not signed in please sign in ');
      }
    });
  }
  signin() {
    const auth = getAuth();
    const { email, password } = this.signinForm.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here
      });
  }

  signout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here
      });
  }

  signup() {
    const auth = getAuth();
    console.log(this.signupForm.value);
    const { email, password } = this.signupForm.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        this.router.navigate(['/home']);
        alert('signed up succesfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.error(errorCode, errorMessage);
        alert('signed up failed: ' + errorMessage);
      });
  }
}
