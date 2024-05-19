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
import {  onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  signinForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public firestore: Firestore,
    public auth: Auth
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

  ngOnInit() {}

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
