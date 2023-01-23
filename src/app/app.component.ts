import { Component } from '@angular/core';
import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(storage: Storage) {
    storage.create();

    
  }
}
