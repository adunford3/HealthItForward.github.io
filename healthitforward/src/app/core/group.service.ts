import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {GroupModel} from './group.model';
import {UserService} from './user.service';

@Injectable()
export class GroupService {

    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth,
                public userService: UserService) {
    }

    /**
     * Returns a promise of all the groups currently saved to the database
     * @return Promise of a groupModel array
     */
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

    /**
     * Returns a promise containing a specific groupModel
     * @param groupId A string of the groupId of the desired group
     * @return A promise containing a groupModel of the desired data
     */
    getGroup(groupId: string) {
        return new Promise<GroupModel>((resolve) => {
            const ref = firebase.database().ref('groups/' + groupId);
            ref.once('value').then(function (snapshot) {
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

    /**
     * Returns a promise containing an array of threadIds of the passed in group
     * @param groupId A string containing the ID of the group looked at for threadIds
     * @return A promise containing an array of threadIds for a specific group
     */
    getGroupThreadIds(groupId: string) {
        return new Promise<string[]>((resolve) => {
            const ref = firebase.database().ref('groups/' + groupId + '/threads');
            ref.once('value').then(function (snapshot) {
                let threadIds = [];
                let i = 0;
                snapshot.forEach(function (childSnapshot) {
                    threadIds[i++] = childSnapshot.val();
                });
                resolve(threadIds);
            });
        });
    }

    /**
     * Return a promise resolving the Firebase call to write a new group element into the database
     * @param group The groupModel to written into the database
     * @return a promise resolving the call made to the database
     */
    addGroup(group: GroupModel) {
        return new Promise<any>(resolve => {
            const groupId = firebase.database().ref().child('groups').push().key;
            firebase.database().ref('groups/' + groupId).set({
                groupDescription: group.groupDescription,
                myGroups: group.groupDescription,
                groupID: groupId,
                groupName: group.groupName,
                mods: group.mods,
                threads: group.threads,
                users: group.users
            });
            this.userService.subscribeToGroup(groupId);
            resolve(groupId);
        });
    }

    updateThreads(groupID: string, length: string, threadId: string) {
        return new Promise<any>(resolve => {
            const ref = firebase.database().ref();
            ref.child('groups/' + groupID + '/threads/' + length).set(threadId);
        });
    }

}
