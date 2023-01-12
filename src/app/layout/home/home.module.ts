import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CtaCardComponent } from 'src/app/cta-card/cta-card.component';
import { TripCardComponent } from 'src/app/trip-card/trip-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    CtaCardComponent,
    TripCardComponent
  ]
})
export class HomePageModule {
  
}
