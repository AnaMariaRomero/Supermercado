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
  time: number = 0;
  interval;
  /*en el constructor debe iniciar la referencia a la lista
  de la base */
  constructor(private baseDatos: AngularFireDatabase) {
    /*le asignamos la lista a la variable que la va a contener.
    Lo que va dentro de list(/turnos) ==> es el "directorio"
    que esta en la base de datos y contiene a todos los turnos */
    this.turnosRef = baseDatos.list('/turnos');
   }

   /* ahora, queremos obtener la lista de turnos para poder mostrarlos */
   obtenerTurnosMostrar(listadoMostrar) {
     /*usamos snapchotChanges para captura de datos y poder modificarlos */
     this.turnosRef
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
      ).subscribe(arg => {
        var listado = Array<TurnoComponent>();
        arg.forEach(function(turno){
          listado.push(new TurnoComponent(turno));
        });
        listadoMostrar(this.ordenarListado(listado));
      }, this.handleError);
  }

  obtenerTurnosEditar(listadoEditar) {
    /*usamos snapchotChanges para captura de datos y poder modificarlos */
    this.turnosRef
     .snapshotChanges()
     .pipe(
       map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
     ).subscribe(arg => {
       var listado = Array<TurnoComponent>();
       arg.forEach(function(turno){
         listado.push(new TurnoComponent(turno));
       });
       listadoEditar(listado);
     }, this.handleError);
 }

  /*ordenamos una lista*/
  ordenarListado(listado: any){
    const turnosCompletos = Array<TurnoComponent>();
    var indicePasada = 0;
    while (indicePasada < 10){
      if(listado[indicePasada]){
        turnosCompletos.push(listado[indicePasada]);
      }else{
        turnosCompletos.push(new TurnoComponent({
          'codigo': '',
          'tiempoEspera': '',
          'tiempoLlegada': ''}));
      }
      indicePasada = indicePasada + 1;
    }
    return turnosCompletos;
    /*ordenar por quien llego primero, o sea, el tiempo menor de llegada, sin contar el 0*/
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

  crearTurno(turno: TurnoComponent, onSaved): void {
    var turnoKey = this.turnosRef.push(turno).key;
    console.log(turnoKey);
    onSaved(turnoKey);
  }

  borrarTurno(key: string): void {
    console.log("llego aca");
    this.turnosRef.remove(key).catch(error => this.handleError(error));
  }
  /*esto nos avisa en consola si ocurre algun error en el proceso y de que tipo */
  private handleError(error) {
    console.log(error);
  }
}
