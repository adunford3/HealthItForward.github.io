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

  createGroup(name: String) {
    let newGroupIdKey = firebase.database().ref().child('groups').push().key;
    return new Promise<any>(resolve => {
      firebase.database().ref("groups/" + newGroupIdKey).set({
        groupID: newGroupIdKey,
        groupName: name,
        threads: ["temporary1", "temporary2"],
        users: [firebase.auth().currentUser.uid]
      }).then( res => {
        resolve(res)
        this.subscribeToGroup(newGroupIdKey, name);
      });
    });
  }

  addUser(userName: String, Email: String, Password: String) {
    //let newUserIdKey = firebase.database().ref().child('users').push().key;
    return new Promise<any>( resolve => {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        userID: firebase.auth().currentUser.uid,
        //userListID: newUserIdKey,
        username: userName,
        email: Email,
        password: Password,
        myGroups: ["test1", "test2"],
        healthForm: ["height", "weight"]
      }).then(res => {
        resolve(res)
        this.userID = firebase.auth().currentUser.uid;
        this.userName = userName;
        this.userEmail = Email;
      });
    });
  }

  //Subscribe to Group with name
  subscribeToGroup(newGroupIdKey, name) {
    firebase.database().ref('users/' + this.getUserID() + '/' + 'myGroups').push().set(newGroupIdKey);
  }


  //Work in Progress for userProfile and TrackmyHealth
  updateUserHealthForum(value: any) {
    return new Promise<any>( resolve => {
      firebase.database().ref('users/' + this.getUserID() + '/' + 'healthForm').set({
        healthForm: value
      }).then( res => {
        resolve(res)
      });
    });
  }

  //Work in progress to get User data
  getUser() {
    let user = firebase.database().ref('users/' + this.getUserID()).once('value').then(function(snapshot) {

    });
  }

  getUserID() {
    return firebase.auth().currentUser.uid;
  }

}
