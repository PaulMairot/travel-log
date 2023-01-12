import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ViewWillEnter } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  public userLoggedName: String;
  public trips;
  
  constructor(private http: HttpClient, private storage: Storage) { 
    
  }


  ngOnInit() {
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.userLoggedName = auth.user.name;
    });
  }


  ionViewWillEnter(): void {
    
    // Make an HTTP request to retrieve the trips.
    const url = `${environment.apiUrl}/trips`;
    this.http.get(url).subscribe((trips) => {
      this.trips = trips
      console.log(`Trips loaded`, this.trips);
    });
  }

}
