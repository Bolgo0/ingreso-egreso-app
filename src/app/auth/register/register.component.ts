import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscripcion: Subscription;

  constructor( public authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ui').subscribe( ui => {
                          this.cargando = ui.isLoading;
                        });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  onSubmit( data: any ) {
    this.authService.crearUsuario( data.nombre, data.email, data.password );
  }

}
