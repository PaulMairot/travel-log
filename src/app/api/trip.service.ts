import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TripRequest } from '../models/trip-request';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  #trip$: ReplaySubject<TripRequest | undefined>;

  constructor(private http: HttpClient, private toastController: ToastController) {
    this.#trip$ = new ReplaySubject(1);
  }

  createTrip$(trip: TripRequest): void {
    const tripUrl = `${environment.apiUrl}/trips`;
    
    this.http.post(tripUrl, trip).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
    

    console.log("created trip");
    
  }

  modifyTrip$(trip: TripRequest, id: string): void {
    const tripUrl = `${environment.apiUrl}/trips/${id}`;
    
    this.http.patch(tripUrl, trip).subscribe(async data => {
      console.log(data);
      const toast = this.toastController.create({
        message: 'Voyage modifié avec succès',
        duration: 2000,
        color: "success",
        position: 'bottom',
        icon: 'checkmark-outline'
      });
  
      (await toast).present();
     }, async error => {

      const toast = this.toastController.create({
        message: error.error.message,
        duration: 5000,
        color: "danger",
        position: 'bottom',
        icon: 'close-outline'
      });
      (await toast).present();
    });
    

    console.log("modify trip");
    
  }

  deleteTrip$(id: string): void {
    const tripUrl = `${environment.apiUrl}/trips/${id}`;
    this.http.delete(tripUrl).subscribe();
  }
}
