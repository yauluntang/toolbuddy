import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

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
  constructor(public api: Api) {
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
        resolve(res);

      }).catch( (error)=>{
        reject({error:error});
      });
    });
  }

  signupEmail( account ) {
    this.userData = {};

    this.userData.name = account.username;
    this.userData.zip = account.zip;
    this.userData.phone = account.phone;
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
    if ( this.userNode ) {
      this.userNode.on('value', snapshot => {
        if (snapshot.val()) {
          this.userData = snapshot.val();
        }
      });
    }
  }

  unsubscribeUser () {
    if (this.userNode) {
      this.userNode.off();
    }
  }

  checkSignIn() {
    return new Promise( (resolve, reject)=> {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.userNode = firebase.database().ref('/customerList').child(this.user.uid);
          resolve(user);
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
