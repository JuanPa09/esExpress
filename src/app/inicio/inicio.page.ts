import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';
import {DataService} from 'src/app/dataManagement'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage implements OnInit {

  Tematexto=""
  Temaicon="";


  constructor(private actionSheetController:ActionSheetController,private router:Router, private data:DataService, private statusBar:StatusBar) { }

  ngOnInit() {
    if(window.localStorage.getItem("tema")=="dark"){
      this.Tematexto="Modo Claro"
      this.Temaicon = "sunny"
    }else{
      this.Tematexto="Modo Oscuro"
      this.Temaicon = "moon"
      document.body.setAttribute('color-theme','light')
      this.statusBar.styleDefault();
    } 
  }

  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    if(window.localStorage.getItem("tema")=="dark"){
      document.body.setAttribute('color-theme','dark')
      this.statusBar.styleBlackTranslucent()
    }else{
      this.statusBar.styleDefault();
    }
  }

  ionViewDidLeave(){
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleLightContent();
  }


  goPedido(tipo){
    this.data.setTipoUbicaciones(1)
    window.localStorage.setItem("tipo",tipo)
    this.router.navigateByUrl('ubicaciones')
  }

  async settings() {
    const actionSheet = await this.actionSheetController.create({
      animated:true,
      cssClass: 'inicio-action-sheet',
      buttons: [{
        text: 'Perfil',
        icon: 'person',
        handler: () => {
          this.router.navigateByUrl('perfil')
        }
      }, {
        text: 'Mis Ubicaciones',
        icon: 'map',
        handler: () => {
          this.data.setTipoUbicaciones(0)
          this.router.navigateByUrl('ubicaciones')
        }
      }, {
        text: 'Mis Pedidos',
        icon: 'clipboard',
        handler: () => {

        }
      }, {
        text: 'Orden Rápida',
        icon: 'alarm',
        handler: () => {
          
        }
      }, {
        text: 'Contacto',
        icon: 'call',
        handler: () => {
          this.router.navigateByUrl('contacto')
        }
      }, {
        text: this.Tematexto,
        icon: this.Temaicon,
        handler:()=>{
          this.cambioTema();
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

  cambioTema(){
    if(window.localStorage.getItem("tema")=="dark"){
      window.localStorage.setItem("tema","light")
      this.Tematexto="Modo Oscuro"
      this.Temaicon = "moon"
      document.body.setAttribute('color-theme','light')
      this.statusBar.styleDefault();
    }else{
      window.localStorage.setItem("tema","dark")
      this.Tematexto="Modo Claro"
      this.Temaicon = "sunny"
      document.body.setAttribute('color-theme','dark')
      this.statusBar.styleBlackTranslucent()
    }
  }

  activarDark(){
    document.body.setAttribute('color-theme','dark')
    this.statusBar.styleBlackTranslucent()
  }

  desactivarDark(){
    document.body.setAttribute('color-theme','light')
    this.statusBar.styleDefault();

    
  }

}
