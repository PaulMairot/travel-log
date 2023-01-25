import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { TripService } from '../api/trip.service';
import { TripRequest } from '../models/trip-request';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.page.html',
  styleUrls: ['./modify-trip.page.scss'],
})
export class ModifyTripPage implements OnInit {

  public tripID;
  public tripSelected;
  public isDataAvailable = false;
  public showValidateButton = false;

  tripRequest: TripRequest;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient, 
    private tripService: TripService,
    private alertController: AlertController
    ) { }

  public changeInput(target) {
    if (this.tripRequest[target.name] != this.tripSelected[target.name]) {
      this.showValidateButton = true;
    } else {
      this.showValidateButton = false;
    }
  }

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    //this.formError = false;
  

    this.tripService.modifyTrip$(this.tripRequest, this.tripID);
  }

  async deleteTrip() {
      const alert = await this.alertController.create({
        header: 'Supprimer le voyage',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel'
          },
          {
            text: 'Supprimer',
            role: 'confirm'
          },
        ],
      });
  
      await alert.present();
  
      await alert.onDidDismiss().then((alert) => {
        if(alert.role == "confirm") {
          this.tripService.deleteTrip$(this.tripID);
        }
        
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tripID = params.id
      console.log(this.tripID);
    })

    // Make an HTTP request to retrieve the place.
    const url = `${environment.apiUrl}/trips/${this.tripID}`;
    console.log(url);
    
    this.http.get(url).subscribe((place) => {
      this.tripSelected = place
      console.log(this.tripSelected);
      this.isDataAvailable = true

      this.tripRequest = {
        title: this.tripSelected.title,
        description: this.tripSelected.description
      };
    });
  }

}
