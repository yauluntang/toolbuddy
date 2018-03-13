import { Component, ViewChild } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import {User} from "../../providers/user/user";
import {Items} from "../../providers/items/items";
declare var $:any;


@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;


  @ViewChild('form') form;

  isReadyToSave: boolean;

  item: any;
  itemImage: any;
  file: any;


  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public camera: Camera, public user:User, public items:Items) {


    this.item = {};

  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        //this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
        this.itemImage = data;
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      this.itemImage = (readerEvent.target as any).result;
      $('#fileImage').attr('src', this.itemImage);

    };
    if ( event.target.files[0] ) {
      this.file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getProfileImageStyle() {
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {

    this.items.add( this.item, this.file ).then(res=>{
      console.log(res);

      this.viewCtrl.dismiss();
    }).catch(e=>{

    });

  }
}
