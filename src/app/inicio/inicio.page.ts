import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private actionSheetController:ActionSheetController,private router:Router) { }

  ngOnInit() {
  }


  async settings() {
    const actionSheet = await this.actionSheetController.create({
      animated:true,
      header: 'Ajustes',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigateByUrl('perfil')
        }
      }, {
        text: 'Mis Ubicaciones',
        icon: 'navigate-circle',
        handler: () => {
          this.router.navigateByUrl('ubicaciones')
        }
      }, {
        text: 'Contacto',
        icon: 'call',
        handler: () => {
          this.router.navigateByUrl('contacto')
        }
      }, {
        text: 'Cerrar Sesión',
        icon: 'log-out',
        role: 'destructive',
        handler: () => {
          this.router.navigateByUrl('login')
        }
      }]
    });
    await actionSheet.present();
  }

}
