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
}
