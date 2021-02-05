import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../dataManagement'

@Component({
  selector: 'app-realizar-pedido',
  templateUrl: './realizar-pedido.page.html',
  styleUrls: ['./realizar-pedido.page.scss'],
})
export class RealizarPedidoPage implements OnInit {

  Rango:boolean=false;
  rangeValues:Object = {upper:500,lower:0};
  boxShadow="0 0 0 0.2rem rgba(186, 104, 200, .25);"

  constructor(private alertController:AlertController, private router:Router,
              private data:DataService) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigateByUrl('ubicaciones')
  }

  textFocus(){
    document.getElementById("marco").style.boxShadow = "0 0 0 0.2rem  #b91d1d7a"
    document.getElementById("marco").style.borderColor="#b91d1d"
  }

  textUnFocus(){
    document.getElementById("marco").style.boxShadow = ""
    document.getElementById("marco").style.borderColor=""
  }

  esp(){
    alert("Funciona")
  }

  minEsp(){
    this.Rango = true
  }

  minNoEsp(){
    this.Rango=false
  }

  cambio(valor){
    console.log(valor)
  }

  infoPedidoAlert(){
    this.presentAlert("Pedido",`<p>(*) Obligatorio</p>  <p>(-) Opcional </p>  <p>*Nombre Del Producto </p>  <p>*Cantidad</p>  <p>-Nombre De Tienda</p> <p>-Otras Observaciones</p>`)
  }

  infoRangeAlert(){
    this.presentAlert("Rango De Precios","Si no sabes el precio de tu producto puedes darnos un aproximado de lo que desees gastar para conseguirtelo al mejor precio disponible")
  }

  infoMarcarAlert(){
    this.presentAlert("Marcar En El Mapa","Si tú producto sólo lo podemos encontrar en una ubicación específica o deseas que te tu producto sea de una ubicación de tu preferencia marca la opción \"Sí\"")
  } 



  next(map){
    if(map=="si"){
      this.data.setTipoMapa(1)
      this.router.navigateByUrl('nueva-ubicacion-mapa')
    }else{
      this.router.navigateByUrl("detalle-pedido")
    }
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

}
