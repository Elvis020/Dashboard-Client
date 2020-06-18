import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  signUpForm: FormGroup;
  email = '';
  password = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isAuthenticated = true;


  constructor(
    private formB: FormBuilder,
    private route: Router,
    private snackBar: MatSnackBar,
    private authSer: AuthService
  ) { }



  async ngOnInit() {
    this.authSer.hasToken() === true;
    this.signUpForm = this.formB.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  onSubmit() {
    if (!this.signUpForm.valid) {
      console.error('Check details well');
    }
    if (this.signUpForm.valid) {
      const email = this.signUpForm.get('email').value;
      const password = this.signUpForm.get('password').value;
      if (email === 'elvis@gmail.com' && password === 'password') {
        localStorage.setItem('token', 'my_token');
        this.route.navigate(['/dashboard']);
        this.snackBar.open('Login successful', 'Welcome', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      } else {
        this.route.navigate(['/login']);
        this.snackBar.open('Cannot login', 'Sorry not a User', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

      }

    }
  }
}






