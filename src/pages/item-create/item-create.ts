import {ApplicationRef, Component, ViewChild} from '@angular/core';
import { Camera } from '@ionic-native/camera';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
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
  itemImages: any;
  updateKey: any;
  itemt: any;

  constructor(private app: ApplicationRef, public navCtrl: NavController, navParams: NavParams, public viewCtrl: ViewController, public camera: Camera, public user:User, public items:Items) {


    this.itemt = [1, 2, 3, 4, 5]
    this.item = navParams.get('item');

    if (!this.item) {
      this.item = {};
      this.item.quality = 0;
      this.updateKey = null;
    }
    else {
      this.updateKey = this.item.key;
    }
    this.itemImages = [];
    if (this.item.imageUrl && this.item.imageUrl.length) {
      for (let i = 0; i < this.item.imageUrl.length; i++) {
        this.itemImages.push({file: null, image: this.item.imageUrl[i], url: this.item.imageUrl[i]})
      }
    }
    if (this.item.imageUrl && !this.item.imageUrl.length) {

      this.itemImages.push({file: null, image: this.item.imageUrl, url: this.item.imageUrl})

    }
  }

  qualityCheckSelect( qualityCheck ){

    this.item.quality = qualityCheck.index;
  }

  ionViewDidLoad() {

  }
  reset(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
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
        this.itemImages.push( this.itemImage );
        this.app.tick();
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }
  deleteImage(index) {
    this.itemImages.splice(index,1);
  }
  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let itemImage = (readerEvent.target as any).result;
      $("#fileInput").val("");
      $("#imageForm")[0].reset();
      this.itemImages.push( { file:this.file, image:itemImage, url:null} );
    }
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

    if ( this.updateKey ){
      this.items.update( this.item, this.updateKey ).then((res:any)=>{
        console.log(res);

        this.items.uploadImages( this.itemImages, this.updateKey ).then( res=>{
          this.viewCtrl.dismiss();
        }).catch(e=>{
          console.error(e)
        })


      }).catch(e=>{
        console.error(e)
      });
    }
    else {
      this.items.add(this.item).then((res: any) => {
        console.log(res);
        this.updateKey = res.res.key;

        this.items.uploadImages(this.itemImages, this.updateKey).then(res => {
          this.viewCtrl.dismiss();
        }).catch(e => {
          console.error(e)
        })


      }).catch(e => {
        console.error(e)
      });
    }

  }
}
