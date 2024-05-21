import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeiwPage } from './veiw.page';

const routes: Routes = [
  {
    path: '',
    component: VeiwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiwPageRoutingModule {}
