import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaUbicacionPageRoutingModule } from './nueva-ubicacion-routing.module';

import { NuevaUbicacionPage } from './nueva-ubicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaUbicacionPageRoutingModule
  ],
  declarations: [NuevaUbicacionPage]
})
export class NuevaUbicacionPageModule {}
