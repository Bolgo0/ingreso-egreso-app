import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;
  total: number;

  public doughnutChartLabels: Label[] = ['Ingreso', 'Egreso'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
    this.subscription = this.store.select('ingresoEgreso')
                    .subscribe( ingresoEgreso => {
                      this.contarIngresoEgreso(ingresoEgreso.items);
                      this.doughnutChartData = [[this.ingresos, this.egresos]];
                    });
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    this.total = 0;

    items.forEach( item => {
      this.total++;
      if ( item.tipo === 'ingreso' ) {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });


  }

}
