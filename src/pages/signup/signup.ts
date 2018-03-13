import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { name: string, email: string, password: string, zip: string, phone: string } = {
    name: '',
    email: '',
    password: '',
    zip: '',
    phone: ''
  };

  public errorMessage: string;
  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })

    this.errorMessage = null;
  }

  doSignup() {

    this.user.signupEmail( this.account ).then( (res:any) =>{
      if ( res.error ){
        this.errorMessage = res.error.message;
        return;
      }
      else {
        this.user.updateUser().then( (res:any) =>{
          this.navCtrl.push(MainPage);
        })
      }
    });
  }

}
