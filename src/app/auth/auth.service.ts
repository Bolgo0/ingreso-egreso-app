import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if ( fbUser ) {
        this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe( ( usuarioObj: any ) => {

              const newUser = new User(usuarioObj);
              this.store.dispatch( new SetUserAction( newUser ) );

            });
      } else {
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( resp => {

      const user: User = {
        uid: resp.user.uid,
        nombre,
        email
      };

      this.afDB.doc(`${resp.user.uid}/usuario`).set(user)
      .then( () => {

        this.router.navigate(['/']);

      });

    })
    .catch( error => {
      console.error(error);
      Swal.fire('Error al crear usuario', error.message, 'error');

    }).finally( () => {
      this.store.dispatch( new DesactivarLoadingAction() );

    });

  }

  login( email: string, password: string ) {
    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth.signInWithEmailAndPassword( email, password )
    .then( resp => {

      this.router.navigate(['/']);

    }).catch( error => {
      console.error(error);
      Swal.fire('Error en el login', error.message , 'error');

    }).finally( () => {
      this.store.dispatch( new DesactivarLoadingAction() );
    });

  }

  logout() {

    this.router.navigate(['login']);
    this.afAuth.auth.signOut();

  }

  isAuth() {
    return this.afAuth.authState.pipe(
        map( fbUser => {

          if (fbUser === null) {
            this.router.navigate(['/login']);
          }

          return fbUser != null;
        })
    );
  }
}
