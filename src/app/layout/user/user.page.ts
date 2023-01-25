import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/auth/auth.service';
import { PictureService } from 'src/app/picture/picture.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public user;
  public picture;


  constructor(private storage: Storage, private auth: AuthService, private router: Router, private pictureService: PictureService) { }

  takePicture() {
    this.picture = this.pictureService.takeAndUploadPicture();
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.user = auth.user;
      console.log(this.user);
      
    });
  }

}
