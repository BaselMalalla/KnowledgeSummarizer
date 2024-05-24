import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCombPageRoutingModule } from './view-comb-routing.module';

import { ViewCombPage } from './view-comb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCombPageRoutingModule
  ],
  declarations: [ViewCombPage]
})
export class ViewCombPageModule {}
