import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nueva-ubicacion',
  templateUrl: './nueva-ubicacion.page.html',
  styleUrls: ['./nueva-ubicacion.page.scss'],
})
export class NuevaUbicacionPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigateByUrl('ubicaciones')
  }

  goMapa(){
    this.router.navigateByUrl('nueva-ubicacion-mapa')
  }

}
