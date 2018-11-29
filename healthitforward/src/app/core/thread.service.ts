import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {ThreadModel} from './thread.model';

@Injectable()
export class ThreadServices {

    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth) {
    }

    /**
     * Returns a promise containing an array of all of the threads currently saved in the database
     */
    getThreads() {
        return new Promise<ThreadModel[]>((resolve) => {
            const ref = firebase.database().ref('threads/');
            ref.once('value').then(function (snapshot) {
                let threads = [];
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

    /**
     * Returns a promise containing a single threadModel of a specific threadId that is passed in
     * @param threadId The threadId of the desired thread
     */
    async getThread(threadId: string) {
        return new Promise<ThreadModel>((resolve) => {
            const ref = firebase.database().ref('threads/' + threadId);
            ref.once('value').then(function (snapshot) {
                const body = snapshot.child('body').val();
                const creatorID = snapshot.child('creatorID').val();
                const replyChain = snapshot.child('replyChain').val();
                const threadID = snapshot.child('threadID').val();
                const title = snapshot.child('title').val();
                const upvotes = snapshot.child('upvotes').val();
                const t = new ThreadModel(body, creatorID, replyChain, threadID, title, upvotes);

                resolve(t);
            });
        });
    }

    // async getGroupThreads(threadIds: string[]) {
    //   let threads = [];
    //   let i = 0;
    //   const self = this;
    //   threadIds.forEach(async function(threadId) {
    //     const threadPromise = await self.getThread((threadId));
    //     threads[i++] = await Promise.resolve((threadPromise));
    //     console.log(await Promise.resolve((threadPromise)));
    //   });
    //   let newThread = await threads;
    //   return newThread;
    // }

    /**
     * Returns a promise that resolves the firebase call to write a new thread into the database
     * @param thread The threadModel of the thread to be written to the database
     */
    // Takes a ThreadModel Object, creates a new Key and writes to the database
    addThread(thread: ThreadModel) {
        return new Promise<any>(resolve => {
            const threadId = firebase.database().ref().child('threads').push().key;
            firebase.database().ref('threads/' + threadId).set({
                body: thread.body,
                creatorID: thread.creatorID,
                replyChain: thread.replyChain,
                threadID: threadId,
                title: thread.title,
                upvotes: thread.upvotes
            });
            console.log(threadId);
            resolve(threadId);
        });
    }
}
