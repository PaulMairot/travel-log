import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PlaceService } from '../api/place.service';
import { PlaceRequest } from '../models/place-request';
import { QimgImage } from '../models/qimgimage';
import { PictureService } from '../picture/picture.service';

@Component({
  selector: 'app-modify-place',
  templateUrl: './modify-place.page.html',
  styleUrls: ['./modify-place.page.scss'],
})
export class ModifyPlacePage implements OnInit {

  public placeID;
  public placeSelected;
  public isDataAvailable = false;

  public tripsList;
  public picture: QimgImage;
  

  placeRequest: PlaceRequest;


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private placeService: PlaceService,private cd: ChangeDetectorRef, private pictureService: PictureService) { 
    
      this.route.queryParams.subscribe(params => {
      this.placeID = params.id
      

      // Make an HTTP request to retrieve the place.
      const url = `${environment.apiUrl}/places/${this.placeID}?include=trip`;
      
      this.http.get(url).subscribe((place) => {
        this.placeSelected = place
        console.log(this.placeSelected);
        this.isDataAvailable = true

        this.placeRequest = {
          name: this.placeSelected.name,
          description: this.placeSelected.description,
          tripId: this.placeSelected.trip.id,
          location: this.placeSelected.location,
          pictureUrl: this.placeSelected.pictureUrl
        };
        
        
      });

    })

    this.http.get(`${environment.apiUrl}/trips`).subscribe((trips) => {
      this.tripsList = trips;
    });
    
  }

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }

    // Hide any previous login error.
    //this.formError = false;
  

    this.placeService.modifyPlace$(this.placeRequest, this.placeID);

  }

  deletePlace() {
    this.placeService.deletePlace$(this.placeID);
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.placeRequest.pictureUrl = picture.url;
    });
  }

  ngOnInit() {
    
       
  }

}
