import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public userLogged: User;

  public places;
  public placesFiltered;

  public trips;
  public tripsFiltered;

  public filterTerm: String;

  constructor(private http: HttpClient, private storage: Storage) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.userLogged = auth.user;
    }).then(() => {
      // Make an HTTP request to retrieve the places.
      const placeUrl = `${environment.apiUrl}/places?include=trip.user`;
      this.http.get(placeUrl).subscribe((places) => {
        this.places = places;
        for (let i = 0; i < this.places.length; i++) {
          if(this.places[i].trip.user.id != this.userLogged.id)
            this.places.splice(i, 1);
            i--;
        }
        console.log(`Places loaded`, places);
      });

      // Make an HTTP request to retrieve the trips.
      const tripUrl = `${environment.apiUrl}/trips?user=${this.userLogged.id}`;
      this.http.get(tripUrl).subscribe((trips) => {
        this.trips = trips
        console.log(`Trips loaded`, this.trips);
      });
    });

    
  }

  searchChange(event) {
    
    const query = event.target.value.toLowerCase();

    this.placesFiltered = this.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
    this.tripsFiltered = this.trips.filter((trip) => trip.title.toLowerCase().includes(query.toLowerCase()));
  }

}
