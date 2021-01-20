import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaUbicacionPage } from './nueva-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaUbicacionPageRoutingModule {}
