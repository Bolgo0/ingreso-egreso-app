import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  cargando: boolean;
  subscripcion: Subscription;

  constructor( private authService: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
    this.subscripcion = this.store.select('ui').subscribe( ui => {
                          this.cargando = ui.isLoading;
                        });
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
  }

  onSubmit( data: any ) {
    this.authService.login(data.email, data.password);
  }

}
