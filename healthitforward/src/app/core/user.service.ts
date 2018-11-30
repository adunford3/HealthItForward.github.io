import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserModel} from './user.model';

@Injectable()
export class UserService {

    myUID = 0;

    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth) {
    }

    /**
     * Returns a promise that resolves or rejects the firebase call requesting the currently logged in user
     */
    // Methods from one of first tutorials //
    getCurrentUser(): any {
        return new Promise<any>((resolve, reject) => {
            const user = firebase.auth().onAuthStateChanged(function (user) {
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    getUsers() {
        return new Promise<UserModel[]>(resolve => {
            const ref = firebase.database().ref('users/');
            ref.once('value').then(function (snapshot) {
                const users = [];
                let i = 0;
                snapshot.forEach(function (childSnapshot) {
                    const email = childSnapshot.child('email').val();
                    const myGroups = childSnapshot.child('myGroups').val();
                    const mySurveys = childSnapshot.child('mySurveys').val();
                    const myThreads = childSnapshot.child('myThreads').val();
                    const password = childSnapshot.child('password').val();
                    const role = childSnapshot.child('role').val();
                    const userID = childSnapshot.child('userID').val();
                    const username = childSnapshot.child('username').val();
                    const u = new UserModel(email, myGroups, mySurveys, myThreads, password, role, userID, username);
                    users[i++] = u;
                });
                resolve(users);
            });
        });
    }

    // Return the currently Logged in users ID
    getUserID() {
        return firebase.auth().currentUser.uid;
    }

    // Work in progress to get User data
    getUser() {
        return new Promise<UserModel>(resolve => {
            const u = this.getCurrentUser().then(function(user) {
                const ref = firebase.database().ref('users/' + user.uid + '/');
                ref.once('value').then(function (snapshot) {
                    let user: UserModel;
                    const email = snapshot.child('email').val();
                    const myGroups = snapshot.child('myGroups').val();
                    const password = snapshot.child('password').val();
                    const userID = snapshot.child('userID').val();
                    const username = snapshot.child('username').val();

                    const role = null;
                    const mySurveys = null;
                    const myThreads = null;

                    //const role = snapshot.child('role').val();
                    //const mySurveys = snapshot.child('mySurveys').val();
                    //const myThreads = snapshot.child('myThreads').val();
                    user = new UserModel(email, myGroups, mySurveys, myThreads, password, role, userID, username);

                    resolve(user);
                });
                return user;
            });

        });

    }

    // takes a UserModel object and creates a new firebase entry with the userid as
    // the main path Key/Path
    adduser(user: UserModel) {
        return new Promise<any>(resolve => {
            // let userId = this.getUserID();
            const userId = user.username;
            firebase.database().ref('users/' + userId).set({
                email: user.email,
                myGroups: user.myGroups,
                mySurveys: user.mySurveys,
                myThreads: user.myThreads,
                password: user.password,
                role: user.role,
                userID: user.userID,
                username: user.username
            }).then(res => {
                resolve(res);
            });
        });
    }

    // Subscribe to Group with group Id Key
    subscribeToGroup(newGroupIdKey) {
        console.log('newGroupIdKey: ' + newGroupIdKey);
        firebase.database().ref('users/' + this.getUserID() + '/' + 'myGroups').push().set(newGroupIdKey);
    }

    unsubscribeFromGroup(groupIdKey) {
        const userPromise = this.getUser().then(function (u) {
            console.log(u);
            return u;
        });

        // const arr = [];
        // let keyToRemove: string;
        // const myGroups = firebase.database().ref('users/' + this.getUserID() + '/myGroups');
        // myGroups.once('value', function(snapshot) {
        //   snapshot.forEach(function (childSnapshot) {
        //     const item = childSnapshot.val();
        //     item.key = childSnapshot.key;
        //
        //     arr.push(item);
        //   });
        // });
        // // iterate through arr of groups
        // for (const group in arr) {
        //   if (group /* .value */ === groupIdKey) {
        //     keyToRemove = group/*.key*/;
        //   }
        // }
        // if (keyToRemove != null) {
        //   firebase.database().ref('users/' + this.getUserID() + '/myGroups/' + keyToRemove).remove();
        // } else {
        //   // did not find group to remove
        // }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

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
            }).then(res => {
                resolve(res);
                this.subscribeToGroup(newGroupIdKey);
            });
        });
    }

    // Work in Progress for userProfile and TrackmyHealth
    updateUserHealthForum(value: String[]) {
        return new Promise<any>(resolve => {
            firebase.database().ref('users/' + this.getUserID() + '/' + 'healthForm').set({
                healthForm: value
            }).then(res => {
                resolve(res);
            });
        });
    }

    /**
     * An older add user Method that writes a new user to the database with hard coded information
     * @param userName The username of the new user
     * @param Email The email of the new user
     * @param Password The password of the new user
     */
    // Older add User method used for testing
    addUser(userName: String, Email: String, Password: String) {
        const userId = firebase.auth().currentUser.uid;
        return new Promise<any>(resolve => {
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
}
