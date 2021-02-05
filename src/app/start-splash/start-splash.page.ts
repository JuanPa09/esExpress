import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-start-splash',
  templateUrl: './start-splash.page.html',
  styleUrls: ['./start-splash.page.scss'],
})
export class StartSplashPage implements OnInit {
  @ViewChild('nombre', { read: ElementRef }) nombre: ElementRef;
  @ViewChild('logo', { read: ElementRef }) logo: ElementRef;

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.startName();
    this.startLogo();
  }

  startName(){
    const loadingAnimation = this.animationCtrl.create('nombreAnimation')
      .addElement(this.nombre.nativeElement)
      .duration(500)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(50px)', 'translateY(0px)')

      loadingAnimation.play();
  }

  async startLogo(){
    const loadingAnimation = this.animationCtrl.create('logoAnimation')
    .addElement(this.logo.nativeElement)
    .duration(1000)
    .fromTo('opacity', '0', '1');

    await loadingAnimation.play();
    this.startLogoSaludar();

  }

  startLogoSaludar(){

    const loadingAnimation = this.animationCtrl.create('logoAnimation')
    .addElement(this.logo.nativeElement)
    .duration(1000)
    .keyframes([
      { offset: 0, transform: 'rotate(0)' },
      { offset: 0.25, transform: 'rotate(-25deg)' },
      { offset: 0.50, transform: 'rotate(0deg)' },
      { offset: 0.75, transform: 'rotate(25deg)' },
      { offset: 1, transform: 'rotate(0deg)' }
    ])

    loadingAnimation.play();

  }

}
