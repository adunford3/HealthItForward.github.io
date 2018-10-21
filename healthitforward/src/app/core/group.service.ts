import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {GroupModel} from "./group.model";

@Injectable()
export class GroupService {

  constructor(public db: AngularFireDatabase,
              public afAuth: AngularFireAuth
  ) {}

  getGroups() {
    return new Promise<GroupModel[]>((resolve) => {
      let ref = firebase.database().ref('groups/');
      ref.once('value').then(function (snapshot) {
        let groups = [];
        let i = 0;
        snapshot.forEach(function (childSnapshot) {
          let groupDescription = childSnapshot.child('groupDescription').val();
          let groupID = childSnapshot.child('groupID').val();
          let groupName = childSnapshot.child('groupName').val();
          let mods = childSnapshot.child('mods').val();
          let threads = childSnapshot.child('threads').val();
          let users = childSnapshot.child('users').val();
          let g = new GroupModel(groupDescription, groupID, groupName, mods, threads, users);

          //console.log("Group: " + g.groupID);
          groups[i++] = g;
        });
        resolve(groups);
      });
    });
  }
}
