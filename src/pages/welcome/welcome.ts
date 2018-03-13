import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {MainPage} from "../pages";
import {User} from "../../providers/providers";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  public loaded: boolean;
  constructor(public navCtrl: NavController, public user: User) {
    this.loaded = false;
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
  ionViewDidEnter() {
    this.user.checkSignIn().then((res:any)=>{
      if ( res.error ){
        this.loaded = true;
      }
      else {
        this.navCtrl.push(MainPage);
      }
    });
  }
}
