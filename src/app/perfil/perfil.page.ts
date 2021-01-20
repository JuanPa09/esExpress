import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  hide:boolean = false
  show:boolean = true
  modificar:boolean = true

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigateByUrl('inicio')
  }

  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  showPass(){
    this.hide = true
    this.show = false
  }

  hidePass(){
    this.hide = false
    this.show = true
  }

  /*
  OBTENER DATOS INICIALES, SI ALGUN DATO DE LOS DATOS INICIALES ES DIFERENTE ENTONCES ACTIVAR EL BOTON DE MODIFICAR
  */

}
