import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingSplashPage } from './loading-splash.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingSplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingSplashPageRoutingModule {}
