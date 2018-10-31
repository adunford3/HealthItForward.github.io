import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserModel} from './user.model';
import {ThreadModel} from './thread.model';
import {GroupModel} from './group.model';

@Injectable()
export class UserService {

constructor(public db: AngularFireDatabase,
   public afAuth: AngularFireAuth
 ) {
 }

  // Methods from one of first tutorials //
  getCurrentUser(): any {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().onAuthStateChanged(function(user) {
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
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  // takes a UserModel object and creates a new firebase entry with the userid as
  // the main path Key/Path
  adduser(user: UserModel) {
    return new Promise<any>( resolve => {
      // let userId = this.getUserID();
      const userId = user.username;
      firebase.database().ref('users/' + userId).set({
        email: user.email,
        myGroups: user.myGroups,
        myThreads: user.myThreads,
        password: user.password,
        role: user.role,
        userID: user.userID,
        username: user.username
      }).then (res => {
        resolve(res);
      });
    });
  }

  // Older add User method used for testing
  addUser(userName: String, Email: String, Password: String) {
    const userId = firebase.auth().currentUser.uid;
    return new Promise<any>( resolve => {
      firebase.database().ref('users/' + userId).set({
        userID: firebase.auth().currentUser.uid,
        // userListID: newUserIdKey,
        username: userName,
        email: Email,
        password: Password,
        myGroups: ['test1', 'test2'],
        healthForm: ['height', 'weight']
      }).then(res => {
        resolve(res);
      });
    });
  }

  // A method that lets a user create a new group and subscribes them to the new group
  // TODO: Will need checking to verify they have authority to create a group
  createGroup(name: String) {
    const newGroupIdKey = firebase.database().ref().child('groups').push().key;
    return new Promise<any>(resolve => {
      firebase.database().ref('groups/' + newGroupIdKey).set({
        groupID: newGroupIdKey,
        groupName: name,
        threads: ['temporary1', 'temporary2'],
        users: [firebase.auth().currentUser.uid]
      }).then( res => {
        resolve(res);
        this.subscribeToGroup(newGroupIdKey);
      });
    });
  }

  // Subscribe to Group with name
  subscribeToGroup(newGroupIdKey) {
    firebase.database().ref('users/' + this.getUserID() + '/' + 'myGroups').push().set(newGroupIdKey);
  }

  unsubscribeFromGroup(groupIdKey) {
    const arr = [];
    let keyToRemove: string;
    const myGroups = firebase.database().ref('users/' + this.getUserID() + '/myGroups');
    myGroups.once('value', function(snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        arr.push(item);
      });
    });
    // iterate through arr of groups
    for (const group in arr) {
      if (group /* .value */ === groupIdKey) {
        keyToRemove = group/*.key*/;
      }
    }
    if (keyToRemove != null) {
      firebase.database().ref('users/' + this.getUserID() + '/myGroups/' + keyToRemove).remove();
    } else {
      // did not find group to remove
    }
  }


  // Work in Progress for userProfile and TrackmyHealth
  updateUserHealthForum(value: String[]) {
    return new Promise<any>( resolve => {
      firebase.database().ref('users/' + this.getUserID() + '/' + 'healthForm').set({
        healthForm: value
      }).then( res => {
        resolve(res);
      });
    });
  }

  // Work in progress to get User data
  getUser() {
    return new Promise<UserModel>( resolve => {
      const userId = this.getUserID();
      const ref = firebase.database().ref('users/' + userId);
      ref.once('value').then(function(snapshot) {
        let user: UserModel;
        const email = snapshot.child('email').val();
        const myGroups = snapshot.child('myGroups').val();
        const myThreads = snapshot.child('myThreads').val();
        const password = snapshot.child('password').val();
        const role = snapshot.child('role').val();
        const userID = snapshot.child('userID').val();
        const username = snapshot.child('username').val();
        user = new UserModel(email, myGroups, myThreads, password, role, userID, username);
        resolve(user);
      });
    });
  }

  getUsers() {
    return new Promise<UserModel[]>(resolve => {
      const ref = firebase.database().ref('users/');
      ref.once('value').then(function(snapshot) {
        const users = [];
        let i = 0;
        snapshot.forEach(function (childSnapshot) {
          const email = childSnapshot.child('email').val();
          const myGroups = childSnapshot.child('myGroups').val();
          const myThreads = childSnapshot.child('myThreads').val();
          const password = childSnapshot.child('password').val();
          const role = childSnapshot.child('role').val();
          const userID = childSnapshot.child('userID').val();
          const username = childSnapshot.child('username').val();
          const u = new UserModel(email, myGroups, myThreads, password, role, userID, username);
          users[i++] = u;
        });
        resolve(users);
      });
    });
  }

  getUserID() {
    return firebase.auth().currentUser.uid;
  }

}
