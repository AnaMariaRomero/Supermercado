import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {ServiceTurnoService} from '../../service/service-turno.service';
import { TurnoComponent } from '../turno/turno.component';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})

/* se crea un comonente turnos para traernos la lista usando
de itnermediario al servidor,
dividimos el que trae la base para modificarla con quien la solicita y modifica*/
export class TurnosComponent implements OnInit {
  service: ServiceTurnoService;
  turnos: Array<TurnoComponent>;
  horaLlegada: string;
  public nuevoCodigo = "";
  constructor(serviceTurno: ServiceTurnoService, public router: Router) {
    this.service = serviceTurno;
    this.turnos = null;
   }

  ngOnInit() {
    var listado = Array<TurnoComponent>();
    /*aca pasa algo muy raro con Angular que no acepta el this
    pero si lo pones dentro de otra variable si*/
    const scope = this;
    this.service.obtenerTurnos(function(turnos) {
      scope.turnos = turnos;
    }
    );
    }

  solicitarTurno(){
    var pasada = 0;
    this.turnos.forEach(turno => {
      if (turno.code == "" && pasada == 0){
        pasada=1;
        this.nuevoCodigo =  this.crearCodigo();
        turno.code = this.nuevoCodigo;
        this.horaLlegada = turno.getTimeFormat();
        this.actualizarTurno(turno.key, turno);
      }
    });
  }

  actualizarTurno(key: string, turno: any){
    this.service.actualizarTurno(key, { 'codigo': turno.code, 'tiempoLlegada': turno.arrivalTime});
  }

  crearCodigo(){
    var numeroAleatorio = (Math.round(Math.random()*99999)).toString();
    var cerosFaltantes = 5 - numeroAleatorio.length;
    for (var i = 0; i < cerosFaltantes; i++){
      numeroAleatorio = "0" + numeroAleatorio;
    }
    return numeroAleatorio;
  }

}
