import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router, private statusBar:StatusBar) { }

  ngOnInit() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.backgroundColorByHexString('#ffffff');
    this.statusBar.styleDefault();
  }

  goSignUp(){
    this.router.navigateByUrl('registro')
  }

  goRecover(){
    this.router.navigateByUrl('recuperacion')
  }

  goHome(){
    this.router.navigateByUrl('loading-splash')
  }

}
