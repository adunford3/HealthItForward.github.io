import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {GroupModel} from './group.model';
import {ThreadModel} from './thread.model';

@Injectable()
export class ThreadServices {

  constructor(public db: AngularFireDatabase,
              public afAuth: AngularFireAuth
  ) {}

  getThreads() {
    return new Promise<ThreadModel[]>((resolve) => {
      const ref = firebase.database().ref('threads/');
      ref.once('value').then(function (snapshot) {
        const threads = [];
        let i = 0;
        snapshot.forEach(function (childSnapshot) {
          const body = childSnapshot.child('body').val();
          const creatorID = childSnapshot.child('creatorID').val();
          const replyChain = childSnapshot.child('replyChain').val();
          const threadID = childSnapshot.child('threadID').val();
          const title = childSnapshot.child('title').val();
          const upvotes = childSnapshot.child('upvotes').val();
          const t = new ThreadModel(body, creatorID, replyChain, threadID, title, upvotes);

          threads[i++] = t;
        });
        resolve(threads);
      });
    });
  }

  // Takes a ThreadModel Object, creates a new Key and writes to the database
  addThread(thread: ThreadModel) {
    return new Promise<any>( resolve => {
      const threadId = firebase.database().ref().child('threads').push().key;
      firebase.database().ref('threads/' + threadId).set({
        body: thread.body,
        creatorID: thread.creatorID,
        replyChain: thread.replyChain,
        threadID: threadId,
        title: thread.title,
        upvotes: thread.upvotes
      }).then (res => {
        resolve(res);
      });
    });
  }
}
