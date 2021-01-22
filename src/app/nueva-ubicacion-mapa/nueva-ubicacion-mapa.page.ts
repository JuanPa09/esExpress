import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router';
import { mapStyle} from './custom-style-night'
import { mapStyleDefault} from './custom-style-day'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';




declare var google: any;

var id,target,options


@Component({
  selector: 'app-nueva-ubicacion-mapa',
  templateUrl: './nueva-ubicacion-mapa.page.html',
  styleUrls: ['./nueva-ubicacion-mapa.page.scss'],
})
export class NuevaUbicacionMapaPage implements OnInit {

  map:any;
  actualMarker:any
  markerOn:boolean = false
  finishProcess:boolean = false
  loadingOn = false
  tcolor = "#ffffff"
  icolor = "#000000"
  locationActivated:boolean;

  

  @ViewChild('map',{read:ElementRef,static:false})mapRef:ElementRef;

  infoWindows:any = []
  markers:any = [
    {
      title:"Ubicacion Entrega",
      latitude:14.318348507050816,
      longitude:-90.79645604374785
    }
  ]

  constructor(private router:Router,private alertController:AlertController,private geolocation: Geolocation,public loadingController: LoadingController) {
    
   }

  ngOnInit() {
    
  }

  ionViewDidEnter(){

    this.showMap();

    this.map.addListener("click", (event) => {
      let lat = event.latLng.toJSON().lat
      let lng = event.latLng.toJSON().lng
      if (this.getDistanceFromLatLonInKm(14.300959025882872,-90.78743884452985,lat,lng)<=3.3){
        //Perimetro Abarcado
        this.addMarker(event.latLng);
      }else{
        this.presentAlert("Distancia No Cubierta","En este momento no cubrimos esta área");
      }

      //this.addMarker(event.latLng);
    });

    //id = navigator.geolocation.watchPosition(this.success,null,{enableHighAccuracy:true,timeout:5000,maximumAge:0})
  } 

  myLocation(){

    /*this.diagnostic.isLocationEnabled().then((isEnabled) => {
      if(!isEnabled){
          //handle confirmation window code here and then call switchToLocationSettings
        this.diagnostic.switchToLocationSettings();
      }
    })*/

    if (navigator.geolocation) {
      if(this.actualMarker!=undefined){
        this.actualMarker.setMap(null);
      }
      this.finishProcess = false
      this.loadingOn = false
      this.presentLoading();
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          
          if(this.loadingOn){
            this.loadingController.dismiss();
          }
          
          this.finishProcess = true;
          if (this.getDistanceFromLatLonInKm(14.300959025882872,-90.78743884452985,pos.lat,pos.lng)<=3.3){
            //Perimetro Abarcado
            this.addMarker(pos);
            this.map.panTo(pos);
            this.map.setZoom(18)
          }else{
            this.presentAlert("Distancia No Cubierta","En este momento no cubrimos esta área");
          }
        }
      ,(err)=>{this.presentAlert("Error De Ubicación","Verifica que tengas encendido el gps")});
    }
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  showMap(){
    const location = new google.maps.LatLng(14.318348507050816, -90.79645604374785)
    let style = []
    if(this.isNight()){
      style = mapStyle
      this.tcolor = "#35394B"
      this.icolor = "#ffffff"
    }else{
      style = mapStyleDefault
    }
    const options = {
      center:location,
      zoom:15,
      styles: style,
      disableDefaultUI: true
    }

    

    this.map = new google.maps.Map(this.mapRef.nativeElement,options)
  }


  addMarker(location) {
    this.markerOn = true
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.DROP
      
    });

    marker.addListener("click", () => {
      marker.setMap(null)
      this.markerOn = false
    });

    this.map.addListener("click", (event) => {
      marker.setMap(null)
    });

    this.actualMarker = marker
    this.markers.push(marker);
  }
  

  success = (pos) =>{
    var crd = pos.coords;
    console.log(crd.latitude);

    const posi = {
      lat: crd.latitude,
      lng: crd.longitude
    };

    this.addMarker(posi)
  }

  /*
  Custom Map Style For Night
   */

  isNight(){
    //Returns true if the time is between
    //6pm to 6am
    let time = new Date().getHours();
    return (time > 6 && time < 18) ? false : true;
  }

  async presentAlert(titulo,texto) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: texto,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Buscando Tu ubicación...',
      duration: 7000
    });
    if(!this.finishProcess){
      await loading.present();
      this.loadingOn = true
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
    
  }


  goHome(){
    this.router.navigateByUrl('nueva-ubicacion')
  }

  guardar(){
    this.presentAlert("Ubicación Guardada","Puedes encontrar tu nueva ubicación en \"Mis Ubicaciones\"")
    this.router.navigateByUrl('inicio')
  }
 


}
