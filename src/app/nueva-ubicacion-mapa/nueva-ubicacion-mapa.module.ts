import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaUbicacionMapaPageRoutingModule } from './nueva-ubicacion-mapa-routing.module';

import { NuevaUbicacionMapaPage } from './nueva-ubicacion-mapa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaUbicacionMapaPageRoutingModule
  ],
  declarations: [NuevaUbicacionMapaPage]
})
export class NuevaUbicacionMapaPageModule {}
