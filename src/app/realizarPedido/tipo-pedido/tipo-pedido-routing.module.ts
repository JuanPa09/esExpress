import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoPedidoPage } from './tipo-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: TipoPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoPedidoPageRoutingModule {}
