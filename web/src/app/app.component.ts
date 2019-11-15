/*De manera predeterminada, acompañando a este archivo vienen los de extension
.html y .css, como no usamos ninguno los borré.
Modifiqué el template para que se use las paginas del header, footer y de los turnos */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  template:
  `<app-header></app-header>
  <app-turnos></app-turnos>
  <app-footer></app-footer>`,
})
export class AppComponent {
  title = 'super';
  constructor(router: Router) {}
}
