import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VeiwPageRoutingModule } from './veiw-routing.module';

import { VeiwPage } from './veiw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VeiwPageRoutingModule
  ],
  declarations: [VeiwPage]
})
export class VeiwPageModule {}
