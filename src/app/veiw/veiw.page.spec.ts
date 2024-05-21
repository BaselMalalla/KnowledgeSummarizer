import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VeiwPage } from './veiw.page';

describe('VeiwPage', () => {
  let component: VeiwPage;
  let fixture: ComponentFixture<VeiwPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VeiwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
