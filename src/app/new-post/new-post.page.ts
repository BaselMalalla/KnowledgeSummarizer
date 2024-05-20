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
      detail: this.createDetailGroup(),
      detailsArray: this.fb.array([this.createDetailGroup()]),
    });

    // Subscribe to type changes to dynamically add or remove summary controls
    this.postForm.get('type')?.valueChanges.subscribe((value) => {
      if (value === 'book') {
        if (this.detailsArray.length === 0) {
          this.addDetail();
        }
      } else {
        this.clearDetailsArray();
      }
    });
  }

  sanitizeFormData(formData: any) {
    const { type, topicsString, title, detail, detailsArray } = formData;
    const topics = topicsString.split(',').map((topic: string) => topic.trim());
    const summary = [detail.summary];
    const images = [detail.image];
    detailsArray.forEach((detailGroup: any) => {
      summary.push(detailGroup.summary);
      images.push(detailGroup.image);
    });
    const newPost: Post = {
      type,
      topics,
      title,
      date: new Date(),
      summary,
      images,
    };
    console.log(newPost);
    return newPost;
  }

  createDetailGroup(): FormGroup {
    return this.fb.group({
      summary: [''],
      image: [''],
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

  async onSubmit() {
    if (this.postForm.valid) {
      const newPost = this.sanitizeFormData(this.postForm.value);
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

  async showAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
