
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  loggedInStatus = false;


  constructor(
    private route: Router,
    private authServy: AuthService
  ) { }

  // A canActivte function that blocks unauthorised routes
  canActivate(): boolean {
    if (this.authServy.hasToken() === false) {
      this.route.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
