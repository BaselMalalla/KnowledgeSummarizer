import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCombPage } from './view-comb.page';

describe('ViewCombPage', () => {
  let component: ViewCombPage;
  let fixture: ComponentFixture<ViewCombPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewCombPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
