import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewWillEnter {
  constructor(private http: HttpClient) {}

  ionViewWillEnter(): void {
    // Make an HTTP request to retrieve the trips.
    const url = `${environment.apiUrl}/trips`;
    this.http.get(url).subscribe((trips) => {
      console.log(`Trips loaded`, trips);
    });
  }
}
