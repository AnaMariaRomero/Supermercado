/*Tanto el footer como el header se crean para separar el layout
de la pagina, que dos compenentes se encargen de la cabecera
y el pie de la pagina, que no sea preocupacion de la entidad
que brinda el contenido "importante" */
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
