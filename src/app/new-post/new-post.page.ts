import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { atLeastOneElement } from '../shared/validators';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage {
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      type: ['', Validators.required],
      title: ['', Validators.required],
      summary: ['', Validators.required],
      summariesArray: this.fb.array([]),
      image: [''],
    });

    // Subscribe to type changes to dynamically add or remove summary controls
    this.postForm.get('type')?.valueChanges.subscribe((value) => {
      if (value === 'book') {
        if (this.summariesArray.length === 0) {
          this.addSummary();
        }
      } else {
        this.clearSummaries();
      }
    });
  }

  get summariesArray(): FormArray {
    return this.postForm.get('summariesArray') as FormArray;
  }

  addSummary() {
    this.summariesArray.push(this.fb.control('', Validators.required));
  }

  removeSummary(index: number) {
    this.summariesArray.removeAt(index);
  }

  clearSummaries() {
    while (this.summariesArray.length !== 0) {
      this.summariesArray.removeAt(0);
    }
  }

  onSubmit() {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      // Handle form submission here
    } else {
      console.log('Form is invalid');
    }
  }
}
