import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Post } from '../shared/interfaces';
import { FirebaseService } from '../firebase.service';
import { AlertController, LoadingController } from '@ionic/angular';

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
    private alertController: AlertController,
    private loadingController: LoadingController
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
    const files = (event.target as HTMLInputElement)?.files;
    if (files && files.length > 0 && this.detailsArray.at(index)) {
      const images = Array.from(files);
      this.detailsArray.at(index).patchValue({
        images: images,
      });
      this.detailsArray.at(index).get('images')?.updateValueAndValidity();
      console.log(this.detailsArray.at(index).value);
    }
  }

  async sanitizeFormData(formData: any): Promise<Post> {
    const { type, topicsString, title, detailsArray } = formData;
    const topics = topicsString
      .split(',')
      .map((topic: string) => topic.trim())
      .filter((topic: string) => topic.trim().length > 0);

    for (let detail of detailsArray) {
      if (detail.images && detail.images.length > 0) {
        const uploadedImagesUrls = await this.uploadImages(detail.images);
        detail.images = uploadedImagesUrls;
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

  async uploadImages(images: any[]): Promise<string[]> {
    const uploadedImagesUrls = [];
    for (let image of images) {
      const filePath = `images/${new Date().getTime()}_${image.name}`;
      const imageURL = await this.firebaseService.uploadImage(image, filePath);
      uploadedImagesUrls.push(imageURL);
    }
    return uploadedImagesUrls;
  }

  async onSubmit() {
    if (this.postForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Uploading post...',
      });
      await loading.present();
      const newPost = await this.sanitizeFormData(this.postForm.value);
      try {
        await this.firebaseService.addPost(newPost);
        this.showAlert('Success', 'Post created successfully');
        this.clearForm();
      } catch (err) {
        this.showAlert('Error', 'Failed to create a new post');
        console.error('Failed to create a new post', err);
      } finally {
        await loading.dismiss();
      }
    } else {
      console.log('Form is invalid');
    }
  }

  clearForm() {
    this.postForm.reset();
    this.clearDetailsArray();
    this.addDetail();
  }

  createDetailGroup(): FormGroup {
    return this.fb.group({
      summary: ['', Validators.required],
      images: [[]],
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
