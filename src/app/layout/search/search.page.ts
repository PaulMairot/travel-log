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
  public filterTerm: String;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    
    // Make an HTTP request to retrieve the trips.
    const url = `${environment.apiUrl}/places`;
    this.http.get(url).subscribe((places) => {
      this.places = places
      console.log(`Places loaded`, this.places);
    });
  }

  searchChange(event) {
    
    const query = event.target.value.toLowerCase();

    this.placesFiltered = this.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));
    
  }

}
