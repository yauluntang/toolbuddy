import {Component, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import {Settings, User} from '../../providers/providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;


  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;


  tempUserData: any;
  isEdit: boolean;
  vendor: boolean;
  registrationSteps: string;
  @ViewChild('form') form;


  constructor(public app: App, public navCtrl: NavController,public user: User,
    public settings: Settings,
    public navParams: NavParams,
    public translate: TranslateService) {
    this.tempUserData = {};
    this.isEdit = false;
    this.vendor = false;
    this.registrationSteps = 'customer';
  }



  edit(){
    this.isEdit = true;
    if ( this.user.userData ) {
      this.tempUserData = JSON.parse(JSON.stringify(this.user.userData));
    }
  }

  cancel(){
    this.isEdit = false;
  }

  done(){
    this.user.userData = this.tempUserData;
    this.user.updateUser().then( (res)=>{
      this.isEdit = false;
    }).catch( (err)=>{

    });
  }

  continue(){
    if ( this.registrationSteps === 'customer' )
      if ( this.tempUserData.vendor ){
        this.registrationSteps = 'vendor';
      }
      else {
        this.done()
      }
    else {
      this.registrationSteps = 'customer';
      this.done()
    }


  }

  _buildForm() {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {

    if ( !this.user.userData.registered ){
      this.edit();
    }

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
  logout(){
    this.user.userData = null;
    this.user.logout().then(res=>{
      this.app.getRootNav().setRoot('WelcomePage');
    });
  }

  gotoTutorial(){
    this.settings.setValue('skipTutorial', false).then( ()=> {
      this.app.getRootNav().setRoot('TutorialPage');
    });
  }
}
