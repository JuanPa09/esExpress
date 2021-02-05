import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-loading-splash',
  templateUrl: './loading-splash.page.html',
  styleUrls: ['./loading-splash.page.scss'],
})
export class LoadingSplashPage implements OnInit {
  @ViewChild('imagen', { read: ElementRef }) imagen: ElementRef;

  constructor(private animationCtrl: AnimationController, private router:Router) { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.startLoad();
  }

  async startLoad() {
    const loadingAnimation = this.animationCtrl.create('loading-animation')
      .addElement(this.imagen.nativeElement)
      .duration(1500)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'rotate(0)' },
        { offset: 0.5, transform: 'rotate(350deg)' },
        { offset: 1, transform: 'rotate(360deg)' }
      ])
      
     
    

    // Don't forget to start the animation!
    await loadingAnimation.play();
    await this.timeout(500)
    this.router.navigateByUrl('inicio')

    
    
  }

  async timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

 

}
