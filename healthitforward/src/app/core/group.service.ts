import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {GroupModel} from './group.model';
import {UserService} from './user.service';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class GroupService {

  constructor(public db: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public userService: UserService
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

  getGroup(groupId: string) {
    return new Promise<GroupModel>((resolve) => {
      const ref = firebase.database().ref('groups/' + groupId);
      ref.once('value').then(function(snapshot) {
        const groupDescription = snapshot.child('groupDescription').val();
        const groupID = snapshot.child('groupID').val();
        const groupName = snapshot.child('groupName').val();
        const mods = snapshot.child('mods').val();
        const threads = snapshot.child('threads').val();
        const users = snapshot.child('users').val();
        let g = new GroupModel(groupDescription, groupID, groupName, mods, threads, users);

        resolve(g);
      });
    });
  }

  getGroupThreadIds(groupId: string) {
    return new Promise<string[]>((resolve) => {
      const ref = firebase.database().ref('groups/' + groupId + '/threads');
      ref.once('value').then(function(snapshot) {
        let threadIds = [];
        let i = 0;
        snapshot.forEach(function(childSnapshot) {
          threadIds[i++] = childSnapshot.val();
        });
        resolve(threadIds);
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
        this.userService.subscribeToGroup(groupId);
      });
    });
  }

  updateThreads(group: GroupModel, threadID: string) {
    return new Promise<any>( resolve => {
      const ref = firebase.database().ref
    });
  }
}
