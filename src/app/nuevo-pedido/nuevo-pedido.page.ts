import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Keyboard} from '@ionic-native/keyboard/ngx'
import { Router } from '@angular/router';
import { DataService } from '../dataManagement';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.page.html',
  styleUrls: ['./nuevo-pedido.page.scss'],
})
export class NuevoPedidoPage implements OnInit {

  items = [
    {nombre:"",cantidad:1}
  ]
  rangeValues = {upper:100,lower:0};
  Rango:Boolean = false

  iconoPedido:string = ""
  tipoPedido:string = ""
  objetosPedido:string = ""


  constructor(private alertController:AlertController, private keyboard:Keyboard, private router:Router,private data:DataService) { }

  ngOnInit() {
    let tipo = window.localStorage.getItem("tipo")

    switch(tipo){
        case "1":
          this.iconoPedido = "restaurant"
          this.tipoPedido = "Restaurante"
          this.objetosPedido = "Menu"
          break;
        case "2":
          this.iconoPedido = "bandage"
          this.tipoPedido = "Farmacia"
          this.objetosPedido = "Medicamentos"
          break;
        case "3":
          this.iconoPedido = "basket"
          this.tipoPedido = "Supermercado"
          this.objetosPedido = "Articulos"
          break;
        default:
          this.iconoPedido = "storefront"
          this.tipoPedido = "Tienda"
          this.objetosPedido = "Articulos"
          break;
    }

  }

  agregarCampo(){
    if(this.items.length<=14){
      this.items.push({nombre:"",cantidad:1})
    }
  }

  borrarCampo(item){
    if(this.items.length !=1){
      let index = this.items.indexOf(item)
      this.items.splice(index,1)
    }
  }

  disminuir(item){
    if(item.cantidad>=2){
      item.cantidad = item.cantidad-1
    }
  }

  aumentar(item){
    if(item.cantidad<=9){
      item.cantidad = item.cantidad+1
    }
  }

  barraGasto(value){
    if(value == "esp"){
      this.Rango = true
    }else{
      this.Rango  = false
    }
  }

  ayudaTotalPedido(){
    this.presentAlert("Rango De Precios","Si no sabes el precio de tu producto puedes darnos un aproximado de lo que desees gastar para conseguirtelo al mejor precio disponible")
  }

  ayudaEspecificarMapa(){
    this.presentAlert("Marcar En El Mapa","Si tú producto sólo lo podemos encontrar en una ubicación específica o deseas que te tu producto sea de una ubicación de tu preferencia marca la opción \"Especificar\"")
  }

  async presentAlert(header,message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['Entendido']
    });

    await alert.present();
  }

  closeKeyBoard(){
    this.keyboard.hide();
  }

  guardarNombre(item,value){
    item.nombre = value;
  }


  continuar(nombre,gasto,rango,mapa,indicaciones){

    window.localStorage.setItem("productos",JSON.stringify(this.items))
    window.localStorage.setItem("nombre",nombre)
    if(gasto=="esp"){
      window.localStorage.setItem("min",this.rangeValues.lower.toString())
      window.localStorage.setItem("max",this.rangeValues.upper.toString())
    }else{
      window.localStorage.setItem("min","")
      window.localStorage.setItem("max","")
    }
    window.localStorage.setItem("indicaciones",indicaciones)


    //alert(window.localStorage.getItem("productos")+" "+window.localStorage.getItem("nombre")+" "+window.localStorage.getItem("min")+" "+window.localStorage.getItem("max")+" "+window.localStorage.getItem("indicaciones"))

    if(mapa=="esp"){
      this.data.setTipoMapa(1)
      this.router.navigateByUrl('nueva-ubicacion-mapa')
    }else{
      window.localStorage.setItem("latitud","")
      window.localStorage.setItem("longitud","")
      this.router.navigateByUrl('detalle-pedido')
    }

    


  }

  

}
