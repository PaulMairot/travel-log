import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { PlaceModalComponent } from 'src/app/modals/place-modal/place-modal.component';
import { timeout } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { AddPlacePage } from 'src/app/add-place/add-place.page';
import { Storage } from '@ionic/storage-angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit {

  private places = undefined;
  public trips = undefined;
  public coordinates = undefined;

  public map = undefined;

  public isModalOpen = false;
  public isAddModalOpen = false;
  public mapLoaded = false;

  public userMarkerID = undefined
  public userMarkerCoordinates = {
    'latitude': undefined,
    'longitude': undefined
  }

  public userLogged: User;
  public selectedPlace = undefined;


  constructor(private http: HttpClient, private router: Router, public navCtrl: NavController, private storage: Storage) { }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coordinates = coordinates;
  };

  public removeUserMarker() {
    this.map.removeMarker(this.userMarkerID)
  }

  public navigateToAddPlace() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        latitude: this.userMarkerCoordinates.latitude,
        longitude: this.userMarkerCoordinates.longitude,
      }
  };

    this.isAddModalOpen = false;

    console.log(this.userMarkerCoordinates);

    this.navCtrl.navigateForward(['add-place'], navigationExtras);
    
    //this.router.navigateByUrl('/add-place', navigationExtras);
    // this.router.navigateByUrl('/add-place')
  }

  ngOnInit() {

    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.userLogged = auth.user;
    }).then(() => {
      // Make an HTTP request to retrieve the places.
      const url = `${environment.apiUrl}/places?include=trip.user`;
      this.http.get(url).subscribe((places) => {
        this.places = places;
        for (let i = 0; i < this.places.length; i++) {
          if(this.places[i].trip.user.id != this.userLogged.id) {
            this.places.splice(i, 1);
            i--;
          }
        }
        console.log(`Places loaded`, places);
      });
    });

    const apiKey = environment.mapApiKey;

    const mapRef = document.getElementById('map');

    this.locate().then(async ()=> {      

      this.map = await GoogleMap.create({
        id: '9005095ea83b3294', // Unique identifier for this map instance
        element: mapRef, // reference to the capacitor-google-map element
        apiKey: apiKey, // Your Google Maps API Key
        config: {
          center: {
            // The initial position to be rendered by the map
            lat: this.coordinates.coords.latitude,
            lng: this.coordinates.coords.longitude,
          },
          disableDefaultUI: true,
          zoom: 12, // The initial zoom level to be rendered by the map
        },
      });

      console.log(this.map);
      

      this.mapLoaded = true;

      let markersPlaces = [];

      this.places.forEach(place => {

        markersPlaces.push({
          title: place.id,
          // iconUrl: 'assets/icon/markerIcon.svg',
          // iconSize: {'width' : 48, 'height' : 48},
          coordinate: {
            lat: place.location.coordinates[0],
            lng: place.location.coordinates[1]
          }
        })
      });

      await this.map.addMarkers(markersPlaces);
      
      // Move the map programmatically
      await this.map.setCamera({
        coordinate: {
          lat: 46.78124830585724,
          lng: 6.647304110643388
        }
      });

      // Handle marker click
      await this.map.setOnMarkerClickListener((event) => {
        console.log(event);
        this.selectedPlace = this.places.find(place => place.id === event.title);
        this.isModalOpen = true;
        
      });

      // Handle marker click
      await this.map.setOnMapClickListener(async (event) => {
        console.log(event);
        const marker = {

          tintColor: { r: 153, g: 128, b: 255, a: 100 },
          coordinate: {
            lat: event.latitude,
            lng: event.longitude
          }
        };

        this.userMarkerCoordinates.latitude = event.latitude;
        this.userMarkerCoordinates.longitude = event.longitude;
        

        this.userMarkerID = await this.map.addMarker(marker)
        this.isAddModalOpen = true;
      });
      
            
    })
  
    
  }

}
