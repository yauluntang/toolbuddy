import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import {NavController} from "ionic-angular";

declare var firebase:any;

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  public user: any;
  public userData: any;
  public userNode: any;
  constructor( public api: Api) {
    this.userNode = null;
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(email, password ) {
    return new Promise( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(email, password).then(res=>{
        this.user = res;
        this.userNode = firebase.database().ref('/customerList').child(this.user.uid);
        this.subscribeUser().then(res=>{
          resolve( this.user );
        });

      }).catch( (error)=>{
        reject({error:error});
      });
    });
  }
  updateCart( cart ){
    return new Promise( (resolve, reject)=>{
      if ( this.user ) {
        this.userNode.update( {cart: cart} ).then( (res)=>{
          resolve(res);
        })
      }
      else {
        reject();
      }
    });

  }
  signupEmail( account ) {
    this.userData = {};

    this.userData.name = account.username;

    return new Promise( (resolve, reject)=>{
      firebase.auth().createUserWithEmailAndPassword( account.email, account.password ).then(res=>{
        this.user = res;
        this.userNode = firebase.database().ref('/customerList').child(this.user.uid);
        this.updateUser().then( resUpdate => {
          resolve({res:res, resUpdate:resUpdate});
        })
        .catch( (error)=>{
          resolve({error:error});
        });
      }).catch( (error)=>{
        resolve({error:error});
      });
    });
  }

  updateUser () {
    return new Promise( (resolve, reject)=>{
      if ( this.user ) {
        this.userNode.update( this.userData ).then( (res)=>{
          resolve(res);
        })
      }
      else {
        reject();
      }
    });

  }

  subscribeUser () {


    return new Promise((resolve, reject) => {
      if (this.userNode) {
        this.userNode.on('value', snapshot => {
          if (snapshot.val()) {
            this.userData = snapshot.val();
            resolve(this.userData);
          }
          else {
            this.userData = {};
            resolve(null);
          }
        });
      }
      else {
        resolve(null);
      }
    });
  }

  unsubscribeUser () {
    if (this.userNode) {
      this.userNode.off();
    }
  }

  googleSignIn(){
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    return new Promise( (resolve, reject)=> {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        this.user = result.user;
        this.userNode = firebase.database().ref('/customerList').child(this.user.uid);

        this.subscribeUser().then(res=>{
          resolve( this.user );
        });

        // ...
      }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    });

  }

  fbSignIn(){
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth().useDeviceLanguage();

    return new Promise( (resolve, reject)=> {
      firebase.auth().signInWithPopup(provider).then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        this.user = result.user;
        this.userNode = firebase.database().ref('/customerList').child(this.user.uid);
        this.subscribeUser().then(res=>{
          resolve( this.user  );
        });
        // ...
      }).catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
      });
    });
  }

  checkSignIn() {
    return new Promise( (resolve, reject)=> {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.userNode = firebase.database().ref('/customerList').child(this.user.uid);
          this.subscribeUser().then(res=>{
            resolve( this.user  );
          });
        } else {
          this.user = null;
          this.userNode = null;
          resolve({error:'error'});
        }
      });
    });
  }

  logout() {
    this.user = null;
    this.userNode = null;
    return firebase.auth().signOut();
  }

  _loggedIn(resp) {
    this.user = resp.user;
  }
}
