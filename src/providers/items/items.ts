import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';
import { User } from "../user/user";
declare var firebase:any;


@Injectable()
export class Items {

  public itemNode: any;
  public itemData: any;
  public itemList: any;
  public yourItemList: any;
  public qualityCheck: any;
  constructor(public api: Api, public user: User) {
    this.itemNode = firebase.database().ref('/itemList');
    this.itemList = [];
    this.yourItemList = [];

    this.qualityCheck = [];
    let qualityText = ['Poor','Fair','Good','Excellent','New'];
    for ( let i = 0; i < 5; i ++ ) {
      this.qualityCheck.push({index: i, text: qualityText[i]});
    }
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

  add( item ) {
    item.uid = this.user.user.uid;
    item.zip = this.user.userData.zip;
    item.owner = this.user.userData.name;
    return new Promise((resolve, reject) => {

      this.itemNode.push(item).then((res: any) => {
        item.key = res.key;
        this.update( item, res.key ).then( (resUpdate:any)=>{
          resolve({res: res});
        });
      });
      /*
      let key = this.itemNode.push().key;
      item.key = key;
      let updates = {};
      updates['/itemList/'+key] = item;
      firebase.database().ref().update(updates).then((res: any) => {
        resolve({res: res});
      })*/
    });
  }

  update( item, key ){
    return new Promise((resolve, reject) => {
      firebase.database().ref().child('/itemList/' + key).update( item ).then( (res:any) => {
        resolve({res: res});
      })
    });
  }

  /*
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


  }*/

  uploadImages ( itemImages, key ) {

    return new Promise( (resolve, reject) =>{
      let promiseList = [];
      for ( let i = 0; i < itemImages.length; i ++ ) {
        let item = itemImages[i];
        if (item.url == null) {
          let promise = new Promise((resolve, reject) => {
            this.uploadImage(item.file, key).then((resImage: any) => {
              console.log('Upload Success')
              item.url = resImage.downloadURL;
              resolve(item);
            }).catch(e=>{
              reject(e);
            });
          })
          promiseList.push(promise);
        }
      }
      Promise.all( promiseList ).then( res => {
        let imageUrl = [];
        for ( let i = 0; i < itemImages.length; i ++ ) {
          imageUrl.push(itemImages[i].url);
        }

        this.itemNode.child('/'+key).update({ imageUrl: imageUrl }).then( res => {
          resolve( res );
        })
      }).catch(e=>{
        reject(e);
      })
    });
  }



  delete(item: Item) {
  }


  guid() {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return Date.now()+'-'+ s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  uploadImage ( image, key ){
    return new Promise( (resolve, reject)=> {
      let storageRef = firebase.storage().ref();
      let ref = storageRef.child('images/item_images/' + this.user.user.uid + '/'+key+'/' + this.guid());
      ref.put(image).then((snapshot) => {

        console.log('Uploaded ',snapshot)

        resolve(snapshot);
      }).catch((e) => {
        reject(e);
      });
    });
  }

}
