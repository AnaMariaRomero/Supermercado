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
