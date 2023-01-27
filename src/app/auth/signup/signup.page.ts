import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupRequest } from 'src/app/models/signup-request';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupRequest: SignupRequest;

  constructor(private auth: AuthService, private router: Router) { 
    this.signupRequest = {
      name: undefined,
      password: undefined,
    };
  }

  onSubmit(form: NgForm) {
    // Do not do anything if the form is invalid.
    if (form.invalid) {
      return;
    }


    // Perform the authentication request to the API.
    this.auth.signup$(this.signupRequest).subscribe({
      next: () => this.router.navigateByUrl("/login"),
      error: (err) => {
        console.warn(`Account creation failed: ${err.message}`);
      },
    });
  }

}
