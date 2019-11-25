import { Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../turnos/turnos.component'
@Component({
  selector: 'app-eliminacion-turno',
  templateUrl: './eliminacion-turno.component.html',
  styleUrls: ['./eliminacion-turno.component.css']
})
export class EliminacionTurnoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EliminacionTurnoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }
}
