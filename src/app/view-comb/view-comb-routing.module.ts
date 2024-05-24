import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCombPage } from './view-comb.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCombPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCombPageRoutingModule {}
