import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Injectable } from '@angular/core';
import { TurnoComponent } from '../entidades/turno/turno.component';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/*creamos un service que sirve de intermediario
en el creamos metodos para realizar las modificaciones en la base
el comando que lo crea es: ng g s nombreDelServicio*/

export class ServiceTurnoService {
  /*creamos una variable lista para traernos las entidades de tipo turno
  es una lista de turnos*/
  turnosRef: AngularFireList<TurnoComponent> = null;
  turnos: any;
  /*en el constructor debe iniciar la referencia a la lista
  de la base */
  constructor(private baseDatos: AngularFireDatabase) {
    /*le asignamos la lista a la variable que la va a contener.
    Lo que va dentro de list(/turnos) ==> es el "directorio"
    que esta en la base de datos y contiene a todos los turnos */
    this.turnosRef = baseDatos.list('/turnos');
   }

   /* ahora, queremos obtener la lista de turnos para poder mostrarlos */
   obtenerTurnos(result) {
     var listado = Array<TurnoComponent>();
     /*usamos snapchotChanges para captura de datos y poder modificarlos */
     this.turnosRef
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      )
      .subscribe(arg => {
        arg.forEach(turno => {
          listado.push(new TurnoComponent(turno));
        });
        result(listado);
      }, this.handleError);
  }
  /*obtenemos un turno */
  obtenerTurno(key: string, turnoCargado){
    return this.baseDatos.object(`turnos/${key}`).snapshotChanges()
    .subscribe(dato => turnoCargado(dato.payload.val()));
  }

  /*como solo vamos a actualizar la base de datos, usamos lo
  siguiente */
  actualizarTurno(key: string, value: any): void {
    this.turnosRef.update(key, value).catch(error => this.handleError(error));
  }

  /*esto nos avisa en consola si ocurre algun error en el proceso y de que tipo */
  private handleError(error) {
    console.log(error);
  }

}
