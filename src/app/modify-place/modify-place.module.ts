import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyPlacePageRoutingModule } from './modify-place-routing.module';

import { ModifyPlacePage } from './modify-place.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyPlacePageRoutingModule
  ],
  declarations: [ModifyPlacePage]
})
export class ModifyPlacePageModule {}
