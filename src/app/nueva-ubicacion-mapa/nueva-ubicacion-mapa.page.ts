import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router';
import { mapStyle} from './custom-style-night'
import { mapStyleDefault} from './custom-style-day'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import {DataService} from '../dataManagement'



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
  locationActivated:boolean;
  gps:boolean = false
  markerLat:string = ""
  markerLong:string = ""

  /* *********Variables Frontend********** */
  tcolor = "#bd0e0e"
  icolor = "#bd0e0e"
  /* ********************* */

  titulo:String = ""

  

  @ViewChild('map',{read:ElementRef,static:false})mapRef:ElementRef;

  infoWindows:any = []
  markers:any = [
    {
      title:"Ubicacion Entrega",
      latitude:14.318348507050816,
      longitude:-90.79645604374785
    }
  ]

  constructor(private router:Router,private alertController:AlertController,private geolocation: Geolocation,public loadingController: LoadingController,
              private androidPermissions: AndroidPermissions,private locationAccuracy: LocationAccuracy,private diagnostic: Diagnostic, private statusBar:StatusBar,
              private data:DataService,private navCtrl:NavController) {
    
   }

  ngOnInit() {
    if(this.data.getTipoMapa()==0){
      //Nueva Ubicación
      this.titulo = "Tu Ubicación"
    }else{
      //Ubicación Pedido
      this.titulo = "Ubicación Pedido"
    }

  }

  ionViewDidEnter(){

    
    this.statusBar.overlaysWebView(true);

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

  ionViewDidLeave(){
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.statusBar.styleDefault();
  }

  checkGPSPermission(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {

          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {

          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }


  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              //alert('requestPermission Error requesting location permissions ' + error)
              
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        this.myLocation();
      },
      error => {this.presentAlert("GPS Desactivado","Activa tu GPS")} /*alert('Error requesting location permissions ' + JSON.stringify(error))*/
    );
  }


  myLocation(){

    if (navigator.geolocation) {
      if(this.actualMarker!=undefined){
        this.actualMarker.setMap(null);
      }
      this.finishProcess = false
      this.loadingOn = false
      this.presentLoading();

      this.geolocation.getCurrentPosition().then(resp=>{
        const pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
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

      })


      /*navigator.geolocation.getCurrentPosition(
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
      ,(err)=>{this.presentAlert("ERROR",err)});*/
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
    const location = new google.maps.LatLng(14.300959025882872, -90.78743884452985)
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
      disableDefaultUI: true,
      clickableIcons: false
    }

    

    this.map = new google.maps.Map(this.mapRef.nativeElement,options)
  }


  addMarker(location) {

    const icon = {
      url:"../../assets/images/cajup-logo.png",
      scaledSize: new google.maps.Size(30,40)
    }
    

    this.markerOn = true
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.DROP
      ,
      icon:icon
      
    });

    this.markerLat = marker.position.latitude;
    this.markerLong = marker.position.longitude;

    

    marker.addListener("click", () => {
      marker.setMap(null)
      this.markerOn = false
      if(this.gps){
        navigator.geolocation.clearWatch(id)
        marker.setIcon("../../assets/images/cajup-logo.png")
      }
    });

    this.map.addListener("click", (event) => {
      marker.setMap(null)
    });

    this.actualMarker = marker
    this.markers.push(marker);
  }
  

  success = (pos) =>{
    this.gps = true
    var crd = pos.coords;
    console.log(crd.latitude);

    const posi = {
      lat: crd.latitude,
      lng: crd.longitude
    };

    if(this.markerOn){
      this.actualMarker.setMap(null);
    }

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


  goBack(){
    window.localStorage.setItem("longitud","")
    window.localStorage.setItem("latitud","")
    this.navCtrl.pop();
  }

  guardar(){
    if(this.data.getTipoMapa()==0){
      this.presentAlert("Ubicación Guardada","Puedes encontrar tu nueva ubicación en \"Mis Ubicaciones\"")
      this.router.navigateByUrl('inicio')
    }else{
      window.localStorage.setItem("longitud",this.markerLong)
      window.localStorage.setItem("latitud",this.markerLat)
      this.router.navigateByUrl('detalle-pedido')
    }
  }
 


}
