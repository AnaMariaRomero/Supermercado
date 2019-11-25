/*desde este archivo se descargan todas las herramientas que utilicemos para decoracion
u otros servicios.
Además, se declaran las importaciones de los demas componentes/entidades que necesitemos para modelar
nuestra pagina*/
import {
MatButtonModule,
MatCardModule,
MatDividerModule,
MatExpansionModule,
MatInputModule,
MatDialogModule,
MatListModule,
MatTableModule,
MatToolbarModule,
MatFormFieldModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DataSource } from '@angular/cdk/table';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgModule } from '@angular/core';
import { TurnosComponent } from './entidades/turnos/turnos.component';
import { environment } from '../environments/environment';
import { EliminacionTurnoComponent } from './entidades/eliminacion-turno/eliminacion-turno.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    TurnosComponent,
    EliminacionTurnoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[EliminacionTurnoComponent],
})
export class AppModule { }
