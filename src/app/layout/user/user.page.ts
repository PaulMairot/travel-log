import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public user;

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.user = auth.user;
      console.log(this.user);
      
    });
  }

}
