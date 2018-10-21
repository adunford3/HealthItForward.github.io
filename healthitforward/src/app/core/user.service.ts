import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserModel} from "./user.model";

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

  unsubscribeFromGroup(groupIdKey) {
    let arr = [];
    let keyToRemove: string;
    let myGroups = firebase.database().ref('users/' + this.getUserID() + '/myGroups');
    myGroups.once('value', function(snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        arr.push(item);
      });
    });
    // iterate through arr of groups
    for (let group in arr) {
      if (group/*.value*/ == groupIdKey) {
        keyToRemove = group/*.key*/;
      }
    }
    if (keyToRemove != null) {
      firebase.database().ref('users/' + this.getUserID() + '/myGroups/' + keyToRemove).remove();
    } else {
      //did not find group to remove
    }
  }


  //Work in Progress for userProfile and TrackmyHealth
  updateUserHealthForum(value: String[]) {
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

  getUsers() {
    return new Promise<UserModel[]>(resolve => {
      let ref = firebase.database().ref('users/');
      ref.once('value').then(function(snapshot) {
        let users = [];
        let i = 0;
        snapshot.forEach(function (childSnapshot) {
          let email = childSnapshot.child('email').val();
          let myGroups = childSnapshot.child('myGroups').val();
          let myThreads = childSnapshot.child('myThreads').val();
          let password = childSnapshot.child('password').val();
          let role = childSnapshot.child('role').val();
          let userID = childSnapshot.child('userID').val();
          let username = childSnapshot.child('username').val();
          let u = new UserModel(email, myGroups, myThreads, password, role, userID, username);
          users[i++] = u;
        });
      });
    });
  }

  getUserID() {
    return firebase.auth().currentUser.uid;
  }

}
