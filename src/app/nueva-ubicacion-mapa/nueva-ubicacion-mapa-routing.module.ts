import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaUbicacionMapaPage } from './nueva-ubicacion-mapa.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaUbicacionMapaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaUbicacionMapaPageRoutingModule {}
