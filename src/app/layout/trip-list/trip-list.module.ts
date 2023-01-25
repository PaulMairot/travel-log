import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripListPageRoutingModule } from './trip-list-routing.module';

import { TripListPage } from './trip-list.page';

import { TripCardComponent } from 'src/app/trip-card/trip-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripListPageRoutingModule
  ],
  declarations: [
    TripListPage, 
    TripCardComponent
  ]
})
export class TripListPageModule {}
