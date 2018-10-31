import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {GroupModel} from './group.model';

@Injectable()
export class GroupService {

  constructor(public db: AngularFireDatabase,
              public afAuth: AngularFireAuth
  ) {}

  getGroups() {
    return new Promise<GroupModel[]>((resolve) => {
      const ref = firebase.database().ref('groups/');
      ref.once('value').then(function (snapshot) {
        let groups = [];
        let i = 0;
        snapshot.forEach(function (childSnapshot) {
          const groupDescription = childSnapshot.child('groupDescription').val();
          const groupID = childSnapshot.child('groupID').val();
          const groupName = childSnapshot.child('groupName').val();
          const mods = childSnapshot.child('mods').val();
          const threads = childSnapshot.child('threads').val();
          const users = childSnapshot.child('users').val();
          let g = new GroupModel(groupDescription, groupID, groupName, mods, threads, users);

          groups[i++] = g;
        });
        resolve(groups);
      });
    });
  }

  addGroup(group: GroupModel) {
    return new Promise<any>( resolve => {
      const groupId = firebase.database().ref().child('groups').push().key;
      firebase.database().ref('groups/' + groupId).set({
        groupDescription: group.groupDescription,
        myGroups: group.groupDescription,
        groupID: groupId,
        groupName: group.groupName,
        mods: group.mods,
        threads: group.threads,
        users: group.users
      }).then (res => {
        resolve(res);
      });
    });
  }
}
