import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartSplashPage } from './start-splash.page';

const routes: Routes = [
  {
    path: '',
    component: StartSplashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartSplashPageRoutingModule {}
