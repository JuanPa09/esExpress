import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goSignUp(){
    this.router.navigateByUrl('registro')
  }

  goRecover(){
    this.router.navigateByUrl('recuperacion')
  }

  goHome(){
    this.router.navigateByUrl('inicio')
  }

}
