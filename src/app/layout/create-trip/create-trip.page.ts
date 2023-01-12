import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from 'src/app/api/trip.service';
import { AuthService } from 'src/app/auth/auth.service';
import { TripRequest } from 'src/app/models/trip-request';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
})
export class CreateTripPage {

  tripRequest: TripRequest;

  formError: boolean;

  constructor(private auth: AuthService, private router: Router, private trip: TripService) {
    this.tripRequest = {
      title: undefined,
      description: undefined,
    };
  }

  // Add a method to log out.
  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  /**
   * Called when the create trip form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    this.formError = false;
  

    this.trip.createTrip$(this.tripRequest);

  }
}
