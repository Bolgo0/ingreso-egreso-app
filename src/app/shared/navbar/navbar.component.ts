import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string;

  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>, private authService: AuthService, private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {

    this.subscription = this.store.select('auth')
              .pipe(
                filter( auth => auth.user != null)
              )
              .subscribe( auth => {
                this.nombre = auth.user.nombre;
              });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
