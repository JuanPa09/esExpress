import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {DataService} from 'src/app/dataManagement'

/*
tipoUbicaciones = 0 -> Mis Ubicaciones Desde Menu
tipoUbicaciones = 1 -> Escoger Ubicación Entrega
*/

@Component({
  selector: 'app-ubicaciones',
  templateUrl: './ubicaciones.page.html',
  styleUrls: ['./ubicaciones.page.scss'],
})
export class UbicacionesPage implements OnInit {

  titulo:string = ""
  entrega:boolean = false

  ubicaciones = [
    {id:"1",icono:"pin",titulo:"Hola",descripcion:"Esto es una nueva ubicacion"},
    {id:"2",icono:"business",titulo:"Mundo",descripcion:"Esto es una segunda Descripcion"}
  ]

  constructor(private router:Router,private data:DataService,private alertController:AlertController) { }

  ngOnInit() {
    if(this.data.getTipoUbicaciones()==0){
      this.titulo = "Mis Ubicaciones"
      this.entrega = false
    }else{
      this.titulo = "Ubicación Entrega"
      this.entrega = true
    }
  }

  ionViewDidEnter(){
  }

  goHome(){
    this.router.navigateByUrl('inicio')
  }

  goNueva(){
    this.router.navigateByUrl('nueva-ubicacion')
  }

  borrarUbicacion(values){
    console.log(values)
  }

  containerSelected(values){
    if(this.data.getTipoUbicaciones() == 0){
      //Modificar Ubicacion
    }else{
      //Seleccionar Ubicacion
      window.localStorage.setItem("direccion",values.descripcion)
      //this.presentAlert(values.titulo)
      this.router.navigateByUrl("nuevo-pedido")
    }
  }

  async presentAlert(nombre) {
    const alert = await this.alertController.create({
      header: 'Ubicacion Seleccionada',
      message: 'Tu pedido será enviado a \"'+nombre+'\"',
      buttons: ['Entendido']
    });

    await alert.present();
  }


}
