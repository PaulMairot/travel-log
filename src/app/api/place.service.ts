import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlaceRequest } from '../models/place-request';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  #place$: ReplaySubject<PlaceRequest | undefined>;

  constructor(private http: HttpClient, private toastController: ToastController, private router: Router) {
    this.#place$ = new ReplaySubject(1);
  }

  addPlace$(place: PlaceRequest): void {
    
    const placeUrl = `${environment.apiUrl}/places`;
    
    this.http.post(placeUrl, place).subscribe(async data => {
      const toast = this.toastController.create({
        message: 'Lieu créé avec succès',
        duration: 2000,
        color: "success",
        position: 'bottom',
        icon: 'checkmark-outline'
      });
      (await toast).present();
      this.router.navigateByUrl("/places-map");
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

    console.log("created place");
    
  }

  modifyPlace$(place: PlaceRequest, id: string): void {
    const placeUrl = `${environment.apiUrl}/places/${id}`;
    
    this.http.patch(placeUrl, place).subscribe(async data => {
      const toast = this.toastController.create({
        message: 'Lieu modifié avec succès',
        duration: 2000,
        color: "success",
        position: 'bottom',
        icon: 'checkmark-outline'
      });
  
      (await toast).present();
      this.router.navigateByUrl("/places-map");
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
    

    console.log("modify place");
    
  }

  deletePlace$(id: string): void {
    const placeUrl = `${environment.apiUrl}/places/${id}`;
    this.http.delete(placeUrl).subscribe(async data => {
      const toast = this.toastController.create({
        message: 'Lieu supprimé',
        duration: 2000,
        color: "warning",
        position: 'bottom',
        icon: 'checkmark-outline'
      });
      (await toast).present();
      this.router.navigateByUrl("/places-map");
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
    
  }
}
