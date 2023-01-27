import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ViewWillEnter } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.page.html',
  styleUrls: ['./trip-list.page.scss'],
})
export class TripListPage implements ViewWillEnter {

  public userLogged: User;
  public trips;

  constructor(private http: HttpClient, private storage: Storage) {}

  ionViewWillEnter(): void {

    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.userLogged = auth.user;
    }).then(() => {
      // Make an HTTP request to retrieve the trips.
      const url = `${environment.apiUrl}/trips?user=${this.userLogged.id}`;
      this.http.get(url).subscribe((trips) => {
        this.trips = trips
      });
    });

  }
}
