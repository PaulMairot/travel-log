import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController } from '@ionic/angular';
import { PlaceModalComponent } from 'src/app/modals/place-modal/place-modal.component';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-places-map',
  templateUrl: './places-map.page.html',
  styleUrls: ['./places-map.page.scss'],
})
export class PlacesMapPage implements OnInit {

  private places;
  public trips;
  public coordinates;
  public isModalOpen = false;

  public selectedPlace;


  constructor(private http: HttpClient) { }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.coordinates = coordinates;
    
  };

  

  ngOnInit() {
     
    // Make an HTTP request to retrieve the places.
    const url = `${environment.apiUrl}/places?include=trip`;
    this.http.get(url).subscribe((places) => {
      this.places = places
      console.log(`Places loaded`, this.places);
    });
    

    const apiKey = environment.mapApiKey;

    const mapRef = document.getElementById('map');

    this.locate().then(async ()=> {      

      const map = await GoogleMap.create({
        id: '9005095ea83b3294', // Unique identifier for this map instance
        element: mapRef, // reference to the capacitor-google-map element
        apiKey: apiKey, // Your Google Maps API Key
        config: {
          center: {
            // The initial position to be rendered by the map
            lat: this.coordinates.coords.latitude,
            lng: this.coordinates.coords.longitude,
          },
          zoom: 12, // The initial zoom level to be rendered by the map
        },
      });

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

      await map.addMarkers(markersPlaces);
      
      // Move the map programmatically
      await map.setCamera({
        coordinate: {
          lat: 46.78124830585724,
          lng: 6.647304110643388
        }
      });

      // Handle marker click
      await map.setOnMarkerClickListener((event) => {
        console.log(event);
        this.selectedPlace = this.places.find(place => place.id === event.title);
        this.isModalOpen = true;
        
      });
      
            
    })
  
    
  }

}
