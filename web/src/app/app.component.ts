import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Component } from '@angular/core';
import { Observable } from 'rxjs';

class Turnos{
  constructor(){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  turnosRef: AngularFireList<any[]>;
  turnos: Observable<any[]>;
  constructor(db: AngularFireDatabase){
    this.turnosRef = db.list('/turnos');
    this.turnos = this.turnosRef.valueChanges();
    this.turnos.subscribe(resultado => console.log("turnos",resultado));
      }

}
