import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  titulo:String = ""
  direccion:String = ""
  telefono:String = ""
  descripcion:String = ""
  categoria:String = ""
  rango:String = ""
  ubicacion:String = ""

  constructor() { }

  ngOnInit() {
    this.cargarDatos();
  }

  confirmar(){
    
  }

  cargarDatos(){
    this.titulo = window.localStorage.getItem("nombre")
    this.direccion = window.localStorage.getItem("direccion")
    this.telefono = window.localStorage.getItem("telefono")
    
    let dataPedido = JSON.parse(window.localStorage.getItem("productos"))

    dataPedido.forEach(element => {
      this.descripcion += " ✦ " + element.cantidad + " " + element.nombre+"\n"
    });

    console.log(this.descripcion)

    let tipo = window.localStorage.getItem("tipo")

    switch(tipo){
        case "1":
          this.categoria = "Comida"
          break;
        case "2":
          this.categoria = "Medicamentos"
          break;
        case "3":
          this.categoria = "Articulos"
          break;
        default:
          this.categoria = "Articulos"
          break;
    }

    if(window.localStorage.getItem("min")!=""){
      this.rango = window.localStorage.getItem("min") +" - "+window.localStorage.getItem("max")
    }else{
      this.rango = "No se especificó"
    }

    if(window.localStorage.getItem("latitud")!=""){
      this.ubicacion = "Se especificó en el mapa"
    }else{
      this.ubicacion = "No se especificó"
    }

  }

}
