import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class GroupService {

  constructor(public db: AngularFireDatabase,
              public afAuth: AngularFireAuth
  ) {}

  getGroups() {
    let groups = firebase.database().ref('groups/');
    groups.on('value', function(snapshot) {
      let returnArr = [];
      snapshot.forEach(function(childSnapshot) {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
      });

      return returnArr;
    });
  }



  createGroup(name: String) {
    let newGroupIdKey = firebase.database().ref().child('groups').push().key;
    return new Promise<any>(resolve => {
      firebase.database().ref("groups/" + newGroupIdKey).set({
        groupID: newGroupIdKey,
        groupName: name,
        threads: ["temporary1", "temporary2"],
        users: ["tmpName"]
      }).then( res => {
        resolve(res)
      });
    });
  }

  addUser(userName: String, Email: String, Password: String) {
    let newUserIdKey = firebase.database().ref().child('users').push().key;
    return new Promise<any>( resolve => {
      firebase.database().ref('users/' + newUserIdKey).set({
        userListID: newUserIdKey,
        username: userName,
        email: Email,
        password: Password
      }).then(res => {
        resolve(res)
      });
    });
  }

}
