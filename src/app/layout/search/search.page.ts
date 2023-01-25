import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public places;
  public placesFiltered;

  public trips;
  public tripsFiltered;

  public filterTerm: String;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    
    // Make an HTTP request to retrieve the places.
    let url = `${environment.apiUrl}/places`;
    this.http.get(url).subscribe((places) => {
      this.places = places
      console.log(`Places loaded`, this.places);
    });

    // Make an HTTP request to retrieve the trips.
    url = `${environment.apiUrl}/trips`;
    this.http.get(url).subscribe((trips) => {
      this.trips = trips
      console.log(`Trips loaded`, this.trips);
    });
  }

  searchChange(event) {
    
    const query = event.target.value.toLowerCase();

    this.placesFiltered = this.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
    this.tripsFiltered = this.trips.filter((trip) => trip.title.toLowerCase().includes(query.toLowerCase()));
  }

}
