import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../dataManagement'

@Component({
  selector: 'app-nueva-ubicacion',
  templateUrl: './nueva-ubicacion.page.html',
  styleUrls: ['./nueva-ubicacion.page.scss'],
})
export class NuevaUbicacionPage implements OnInit {

  constructor(private router:Router, private data:DataService) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigateByUrl('ubicaciones')
  }

  goMapa(){
    this.data.setTipoMapa(0);
    this.router.navigateByUrl('nueva-ubicacion-mapa')
  }

}
