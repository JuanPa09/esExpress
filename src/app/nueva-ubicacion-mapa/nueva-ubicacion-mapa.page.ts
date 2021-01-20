import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router';
import { mapStyle} from './custom-style-night'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';

declare var google: any;



@Component({
  selector: 'app-nueva-ubicacion-mapa',
  templateUrl: './nueva-ubicacion-mapa.page.html',
  styleUrls: ['./nueva-ubicacion-mapa.page.scss'],
})
export class NuevaUbicacionMapaPage implements OnInit {

  map:any;

  

  @ViewChild('map',{read:ElementRef,static:false})mapRef:ElementRef;

  infoWindows:any = []
  markers:any = [
    {
      title:"Ubicacion Entrega",
      latitude:14.318348507050816,
      longitude:-90.79645604374785
    }
  ]

  constructor(private router:Router,private alertController:AlertController,private geolocation: Geolocation) {
    
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
        this.presentAlert();
      }

      //this.addMarker(event.latLng);
    });

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


  addMarkersTopMap(markers){
    for(let marker of markers){
      let position = new google.maps.LatLng(marker.latitude,marker.longitude);
      let mapMarker = new google.maps.Marker({
        position:position,
        title:marker.title,
        latitude:marker.latitude,
        longitude:marker.longitude
      });

      mapMarker.setMap(this.map)
      this.addInfoWindowToMarker(mapMarker);

    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent =  `
      <div id="content">
      <h2 id="firstHeading" class"firstHeading">`+marker.title+`</h2>
      <p>Latitude: `+marker.latitude+`</p>
      <p>Longitude: `+marker.longitude+`</p>
      </div>
    `;

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    })

    marker.addListener('click',()=>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map,marker)
    });

    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }
  

  showMap(){
    const location = new google.maps.LatLng(14.318348507050816, -90.79645604374785)
    let style = []
    if(this.isNight()){
      style = mapStyle
    }
    const options = {
      center:location,
      zoom:15,
      styles: style,
      disableDefaultUI: true
    }

    

    this.map = new google.maps.Map(this.mapRef.nativeElement,options)
    //this.addMarkersTopMap(this.markers)
  }


  

  addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
    });

    marker.addListener("click", () => {
      marker.setMap(null)
    });

    this.map.addListener("click", (event) => {
      marker.setMap(null)
    });

    this.markers.push(marker);
  }
  

  showMyLocation(){
    console.log("Cargando Ubicacion")
    let lat:any;
    let lng:any;
    this.geolocation.getCurrentPosition().then((resp) => {
      lat = resp.coords.latitude
      lng = resp.coords.longitude

      const pos = {
        lat: lat,
        lng: lng
      };
  
      this.map.panTo(pos);
  
  
      let markers:any = [
        {
          title:"Ubicacion Entrega",
          latitude:lat,
          longitude:lng
        }
      ]
  
      this.addMarkersTopMap(markers)
      

     }).catch((error) => {
       console.log('Error getting location', error);
     });

    

  }


  /*
  Custom Map Style For Night
   */

  isNight(){
    //Returns true if the time is between
    //7pm to 5am
    let time = new Date().getHours();
    return (time > 5 && time < 19) ? false : true;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Distancia No Cubierta',
      message: 'En este momento no cubrimos esta área',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

 


}
