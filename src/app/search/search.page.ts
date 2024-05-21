import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
interface checking {
  name: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  ratingRange: any = {
    lower: 1,
    upper: 5,
  };
  minRating: number = 1;
  maxRating: number = 5;
  filterForm: FormGroup;
  selectedDay: string = '';
  searchitem = '';
  FilteredList: checking[] = [];
  List: checking[] = [
    { name: 'ali' },
    { name: 'mohamed' },
    { name: 'ahmed' },
    { name: 'hassan ' },
  ];

  constructor(
    public firebaseService: FirebaseService,
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.FilteredList = this.List;
    this.filterForm = this.fb.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      isRead: ['', [Validators.required]],
      Topic: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  Search() {
    const searchTerm = this.searchitem.toLowerCase();
    this.FilteredList = this.List.filter((item) => {
      return item.name.toLowerCase().startsWith(searchTerm);
    });
  }
  clearAll() {
    this.searchitem = '';
    this.ratingRange = { lower: 1, upper: 5 };

    this.filterForm.reset({ startTime: '', endTime: '' });
  }
  applyFilter() {
    const filters = {
      ...this.filterForm.value,
      day: this.selectedDay,
    };
    // Pass filters to the search page or service
    console.log('Applied Filters:', filters);
    this.navCtrl.back();
  }

  onRangeChange(event: any) {
    this.minRating = event.detail.value.lower;
    this.maxRating = event.detail.value.upper;
  }
}
