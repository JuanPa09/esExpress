import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  constructor(private router:Router, private callNumber:CallNumber ) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigateByUrl('inicio')
  }


  llamar(){
    this.callNumber.callNumber("30237820",true)
    .then(res=>console.log("Se realizó una llamada"))
    .catch(res=>console.log("Error al realizar llamada"))
  }

}
