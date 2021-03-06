import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private authService: AuthService ) { }

  canActivate() {
    return this.authService.isAuth();
  }

  canLoad() {
    return this.authService.isAuth()
              .pipe(
                take(1)
              );
  }
}
