import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UserService {

constructor(public db: AngularFireDatabase,
   public afAuth: AngularFireAuth
 ) {
 }
  private userName: String;
  private userID: String;
  private userEmail: String;


  getCurrentUser(): any {
    return new Promise<any>((resolve, reject) => {
      let user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value): any {
    return new Promise<any>((resolve, reject) => {
      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  addUser(userName: String, Email: String, Password: String) {
    let newUserIdKey = firebase.database().ref().child('users').push().key;
    return new Promise<any>( resolve => {
      firebase.database().ref('users/' + newUserIdKey).set({
        userID: newUserIdKey,
        username: userName,
        email: Email,
        password: Password
      }).then(res => {
        resolve(res)
        this.userID = newUserIdKey;
        this.userName = userName;
        this.userEmail = Email;
      });
      });
    }

    getUserID() {
      return this.userID;
    }

    getUserName() {
      return this.userName;
    }

    getUserEmail() {
      return this.userEmail;
    }
  }
