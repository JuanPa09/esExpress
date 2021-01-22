import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoPedidoPageRoutingModule } from './tipo-pedido-routing.module';

import { TipoPedidoPage } from './tipo-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoPedidoPageRoutingModule
  ],
  declarations: [TipoPedidoPage]
})
export class TipoPedidoPageModule {}
