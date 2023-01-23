import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyPlacePage } from './modify-place.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyPlacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyPlacePageRoutingModule {}
