import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartSplashPageRoutingModule } from './start-splash-routing.module';

import { StartSplashPage } from './start-splash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartSplashPageRoutingModule
  ],
  declarations: [StartSplashPage]
})
export class StartSplashPageModule {}
