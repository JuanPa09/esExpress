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
      .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)')
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.5'},
        { offset: 1, transform: 'scale(1)', opacity: '1'}
      ])
      

    // Don't forget to start the animation!
    await loadingAnimation.play();
    this.router.navigateByUrl('inicio')

    
    
  }

 

}
