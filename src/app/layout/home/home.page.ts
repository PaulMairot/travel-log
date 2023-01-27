import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ViewWillEnter } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  public userLogged: User;
  public userLoggedName = String;
  public trips;

  public navigateToTrip(tripID) {
    this.router.navigateByUrl(`/modify-trip?id=${tripID}`);
  }
  
  constructor(private http: HttpClient, private storage: Storage, private router: Router) { 
    
  }


  ngOnInit() {
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.userLogged = auth.user;
      this.userLoggedName = auth.user.name;
    }).then(() => {
      // Make an HTTP request to retrieve the trips.
      const url = `${environment.apiUrl}/trips?user=${this.userLogged.id}`;
      this.http.get(url).subscribe((trips) => {
        this.trips = trips
        console.log(`Trips loaded`, this.trips);
      });
    });
  }


  ionViewWillEnter(): void {
    
  }

  public navigateToTripList() {
    this.router.navigateByUrl('/trip-list')
  }

}
