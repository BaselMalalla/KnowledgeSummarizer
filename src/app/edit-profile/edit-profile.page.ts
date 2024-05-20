import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  isEditing: boolean = false;
  username: string = '';
  email: string = '';
  password: string = '';
  Bio: string = '';
  constructor(
    private alertController: AlertController,
    public firestore: Firestore,
    public auth: Auth,
    private router: Router
  ) {}

  ngOnInit() {}

  signout() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        this.router.navigate(['/auth']);
        // Sign-out successful.
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here
      });
  }

  save() {
    // Implement your save logic here. For example, send data to the server.
    this.isEditing = false;
    this.presentAlert('Profile Saved', 'Your profile has been updated.');
  }

  // saveFullName() {
  // if (this.name!="") {
  // this.List.push(this.name);

  // }
  // }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
