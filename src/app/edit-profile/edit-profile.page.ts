import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Auth, getAuth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage {
  isEditing: boolean = false;
  username: string = '';
  bio: string = '';
  userId: string = '';

  constructor(
    private alertController: AlertController,
    public auth: Auth,
    private router: Router,
    private userService: UserService
  ) {
    this.userId = this.getCurrentUserId();
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

  async save() {
    const user: User = {
      userId: this.userId,
      username: this.username,
      bio: this.bio,
    };

    try {
      await this.userService.updateUser(user);
      this.isEditing = false;
      this.presentAlert('Profile Saved', 'Your profile has been updated.');
    } catch (error) {
      console.error('Error updating profile:', error);
      this.presentAlert(
        'Error',
        'There was an error updating your profile. Please try again.'
      );
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  signout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.router.navigate(['/auth']);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  }
}
