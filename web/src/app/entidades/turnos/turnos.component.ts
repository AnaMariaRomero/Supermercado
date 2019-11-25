import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { Router } from '@angular/router';
import {ServiceTurnoService} from '../../service/service-turno.service';
import { TurnoComponent } from '../turno/turno.component';
import { EliminacionTurnoComponent } from '../eliminacion-turno/eliminacion-turno.component'

export interface DialogData {
  codigo: string;
}

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
  turnosMostrar: Array<TurnoComponent>;
  turnosEditar: Array<TurnoComponent>;
  horaLlegada: Date;
  codigo: string;
  codigoExitente: boolean;
  tiempoEspera: string;
  public nuevoCodigo = "";
  constructor(public dialogoEliminar: MatDialog, serviceTurno: ServiceTurnoService, public router: Router) {
    this.service = serviceTurno;
    this.turnosMostrar = null;
    this.turnosEditar = null;
   }

  ngOnInit() {
    var listado = Array<TurnoComponent>();
    /*aca pasa algo muy raro con Angular que no acepta el this
    pero si lo pones dentro de otra variable si*/
    const scope = this;
    this.service.obtenerTurnosMostrar(function(turnosMostrar) {
      scope.turnosMostrar = turnosMostrar;
    }
    );
    this.service.obtenerTurnosEditar(function(turnosEditar){
      scope.turnosEditar = turnosEditar;
      scope.iniciarTiempoReseteo(scope.turnosEditar,scope.service);
    })
  }

  iniciarTiempoReseteo(turnos: Array<TurnoComponent>,service: ServiceTurnoService) {
    var indice = 0;
    setTimeout(function() {
      while(indice < turnos.length){
        service.borrarTurno(turnos[indice].key);
        indice = indice + 1;
    } }, 60000000);
  }

  solicitarTurno(){
    var pasada = 0;
    this.nuevoCodigo =  this.crearCodigo();
    this.horaLlegada = new Date();
    //aca CALCULAR EL TIEMPO DE ESPERA EN LA COLA
    this.crearTurno(this.nuevoCodigo,this.calcularTiempoEspera());
  }

  eliminarTurno(){
    const dialogRef = this.dialogoEliminar.open(EliminacionTurnoComponent, {
      width: '250px',
      data: { codigo: this.codigo }
  });
  dialogRef.afterClosed().subscribe(result => {
      this.codigo = result;
      if (!this.verificarCodigo(this.codigo)){
        this.service.borrarTurno(this.codigo);}
      else{ alert("El código es incorrecto. ");}
    });
  }


  calcularTiempoEspera(){
    var lambda = 5;
    var mu = 2;
    var tiempoCalculado = 0;
    /*realizar los calculos*/
    this.tiempoEspera = tiempoCalculado.toString();
    return this.tiempoEspera;
  }

  crearTurno(codigo: string,tiempoEspera: string){
    var turno = new TurnoComponent({
      'key': '',
      'codigo': codigo,
      'tiempoEspera': tiempoEspera,
      'tiempoLlegada': new Date()});
    this.service.crearTurno(turno,turnoKey => {turno.key = turnoKey
    this.service.actualizarTurno(turnoKey,turno)})
  }

  verificarCodigo(nuevoCodigo: string){
    var seRepite = true;
    this.turnosEditar.forEach(turno => {
      if(turno.codigo === nuevoCodigo){
        seRepite = false;
      }
    });
    this.codigoExitente = seRepite;
    return seRepite;
  }

  actualizarTurno(key: string, turno: any){
    this.service.actualizarTurno(key, { 'codigo': turno.codigo, 'tiempoLlegada': new Date()});
  }

  crearCodigo(){
    var numeroAleatorio = (Math.round(Math.random()*99999)).toString();
    var cerosFaltantes = 5 - numeroAleatorio.length;
    for (var i = 0; i < cerosFaltantes; i++){
      numeroAleatorio = "0" + numeroAleatorio;
    }
    if(this.verificarCodigo(numeroAleatorio)){
      return numeroAleatorio;
    }else{
      this.crearCodigo();
    }
  }
}
