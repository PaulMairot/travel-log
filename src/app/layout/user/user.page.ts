import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/auth/auth.service';
import { PictureService } from 'src/app/picture/picture.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public user;
  private tripsList;

  public numberPlaces = 0;


  constructor(private storage: Storage, private auth: AuthService, public router: Router, private http: HttpClient) { }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.user = auth.user;
      
    });

    this.http.get(`${environment.apiUrl}/trips`).subscribe((trips) => {
      this.tripsList = trips;
      this.tripsList.forEach(trip => {
        this.numberPlaces += trip.placesCount;
      });
      
    });
  }

}
