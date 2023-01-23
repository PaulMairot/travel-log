import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TripRequest } from '../models/trip-request';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  #trip$: ReplaySubject<TripRequest | undefined>;

  constructor(private http: HttpClient) {
    this.#trip$ = new ReplaySubject(1);
  }

  createTrip$(trip: TripRequest): void {
    const tripUrl = `${environment.apiUrl}/trips`;
    
    this.http.post(tripUrl, trip).subscribe(data => {
      console.log(data['_body']);
     }, error => {
      console.log(error);
    });
    

    console.log("created trip");
    
  }
}
