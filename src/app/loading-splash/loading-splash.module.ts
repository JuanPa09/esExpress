import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingSplashPageRoutingModule } from './loading-splash-routing.module';

import { LoadingSplashPage } from './loading-splash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingSplashPageRoutingModule
  ],
  declarations: [LoadingSplashPage]
})
export class LoadingSplashPageModule {}
