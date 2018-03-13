import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';
import {User} from "../user/user";
declare var firebase:any;


@Injectable()
export class Items {

  public itemNode: any;
  public itemData: any;
  public itemList: any;
  public yourItemList: any;
  constructor(public api: Api, public user: User) {
    this.itemNode = firebase.database().ref('/itemList');
    this.itemList = [];
    this.yourItemList = [];
  }


  subscribeItems (){
    this.itemNode.on('value', snapshot => {
      if (snapshot.val()) {
        this.itemList.length = 0;
        this.yourItemList.length = 0;
        this.itemData = snapshot.val();
        for ( let k in this.itemData ){
          this.itemList.push( this.itemData[k]);
          if ( this.itemData[k].uid === this.user.user.uid ){
            this.yourItemList.push( this.itemData[k]);
          }
        }
        console.log(this.itemData);
      }
    });
  }

  add( item, image ) {
    item.uid = this.user.user.uid;
    item.zip = this.user.userData.zip;
    item.owner = this.user.userData.name;
    return new Promise((resolve,reject)=> {
      this.itemNode.push(item).then( (res:any) => {
        this.uploadImage( image, res.key ).then( (resImage:any)=>{
          this.itemNode.child('/'+res.key).update({ imageUrl: resImage.downloadURL }).then( (resUpdate:any) =>{
            resolve({res:res, resImage:resImage, resUpdate:resUpdate});
          }).catch( e=> {
            reject(e);
          });
        }).catch( e => {
          reject(e);
        });
      }).catch( e => {
        reject(e);
      });
    });


  }

  delete(item: Item) {
  }


  uploadImage ( image, key ){
    return new Promise( (resolve, reject)=> {
      let storageRef = firebase.storage().ref();
      let ref = storageRef.child('images/item_images/' + this.user.user.uid + '/' + key);
      ref.put(image).then((snapshot) => {
        resolve(snapshot);
      }).catch((e) => {
        reject(e);
      });
    });
  }

}
