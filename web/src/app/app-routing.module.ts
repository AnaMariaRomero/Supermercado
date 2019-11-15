/*En caso de que manejemos muchos componentes que requieran varias pestañas/ventanas
se van creando las rutas de direcciones en este sitio. Con este proyecto, solo manejamos
una vista, no hay problema, esto no se modifica del que viene predeterminado. */

import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
