import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PlaceService } from '../api/place.service';
import { PlaceRequest } from '../models/place-request';
import { PictureService } from '../picture/picture.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  placeRequest: PlaceRequest;
  
  public tripsList;
  public picture;

  public coordinates = {
    'latitude': undefined,
    'longitude': undefined
  }

  constructor(private route: ActivatedRoute,  private place: PlaceService, private http: HttpClient, private pictureService: PictureService) {
    
    this.route.queryParams.subscribe(params => {
      this.coordinates.latitude = params.latitude;
      this.coordinates.longitude = params.longitude 
      
      this.placeRequest = {
        name: undefined,
        description: undefined,
        tripId: undefined,
        location: {
          type: "Point",
          coordinates: [this.coordinates.latitude, this.coordinates.longitude]
        },
        pictureUrl: undefined
      };
      
    });

    
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.placeRequest.pictureUrl = picture.url;
    });
  }

  ngOnInit() {
    

  this.http.get(`${environment.apiUrl}/trips`).subscribe((trips) => {
    this.tripsList = trips;
  });

  }

  /**
   * Called when the add place form is submitted.
   */
  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }
    
    this.place.addPlace$(this.placeRequest);

  }

}
