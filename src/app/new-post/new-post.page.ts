import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Post } from '../shared/interfaces';
import { FirebaseService } from '../firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {
    this.postForm = this.fb.group({
      type: ['', Validators.required],
      topicsString: ['', Validators.required],
      title: ['', Validators.required],
      detailsArray: this.fb.array([this.createDetailGroup()]),
    });

    if (this.detailsArray.length === 0) {
      this.addDetail();
    }
  }

  onImageSelected(event: any, index: number) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file && this.detailsArray.at(index)) {
      this.detailsArray.at(index).patchValue({
        image: file,
      });
      this.detailsArray.at(index).get('image')?.updateValueAndValidity();
      console.log(this.detailsArray.at(index).value);
    }
  }

  async sanitizeFormData(formData: any): Promise<Post> {
    const { type, topicsString, title, detailsArray } = formData;
    const topics = topicsString.split(',').map((topic: string) => topic.trim());

    // Upload images and replace file objects with URLs
    for (let detail of detailsArray) {
      if (detail.image) {
        const filePath = `images/${new Date().getTime()}_${detail.image.name}`;
        const imageURL = await this.firebaseService.uploadImage(
          detail.image,
          filePath
        );
        detail.image = imageURL;
      }
    }

    const newPost: Post = {
      type,
      topics,
      title,
      date: new Date(),
      detailsArray,
    };
    console.log(newPost);
    return newPost;
  }

  async onSubmit() {
    if (this.postForm.valid) {
      const newPost = await this.sanitizeFormData(this.postForm.value);
      try {
        await this.firebaseService.addPost(newPost);
      } catch (err) {
        this.showAlert('Error', 'Failed to create a new post');
        console.error('Failed to create a new post', err);
      }
      // Handle form submission here
      this.postForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }

  createDetailGroup(): FormGroup {
    return this.fb.group({
      summary: ['', Validators.required],
      image: [null],
    });
  }
  get detailsArray(): FormArray {
    return this.postForm.get('detailsArray') as FormArray;
  }

  addDetail() {
    this.detailsArray.push(this.createDetailGroup());
  }

  removeDetail(index: number) {
    this.detailsArray.removeAt(index);
  }

  clearDetailsArray() {
    while (this.detailsArray.length !== 0) {
      this.detailsArray.removeAt(0);
    }
  }

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
