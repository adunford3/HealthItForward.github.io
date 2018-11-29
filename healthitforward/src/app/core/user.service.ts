import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {UserModel} from './user.model';

@Injectable()
export class UserService {

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

    // Work in progress to get User data
    getUser() {
        return new Promise<UserModel>(resolve => {
            this.getUserID().then(function(uID) {
                const userId = uID;
                const ref = firebase.database().ref('users/' + userId);
                ref.once('value').then(function (snapshot) {
                    let user: UserModel;
                    const email = snapshot.child('email').val();
                    const myGroups = snapshot.child('myGroups').val();
                    const mySurveys = snapshot.child('mySurveys').val();
                    const myThreads = snapshot.child('myThreads').val();
                    const password = snapshot.child('password').val();
                    const role = snapshot.child('role').val();
                    const userID = snapshot.child('userID').val();
                    const username = snapshot.child('username').val();
                    user = new UserModel(email, myGroups, mySurveys, myThreads, password, role, userID, username);

                    console.log('might be ooookkkkk: ' + userId);
                    resolve(user);
                });
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
            });
            resolve(userId);
        });
    }

    // Return the currently Logged in users ID
    getUserID() {
        return new Promise<any>(resolve => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    resolve(user.uid);
                }
            });
        });
        // return firebase.auth().currentUser.uid;
    }

    subscribeToSurvey(surveyId: string) {
        this.getUser().then(function(user) {
            let subbed = false;
            for (let i = 0; i < user.mySurveys.length; i++) {
                if (user.mySurveys[i] === surveyId) {
                    subbed = true;
                    break;
                } else {
                    subbed = false;
                }
            }
            if (!subbed) {
                console.log('should subscribe: ' + surveyId);
                firebase.database().ref().child('users/' + user.userID + '/mySurveys/' + user.mySurveys.length).set(surveyId);
                location.reload(true);
            } else {
                console.log('already subbed');
                location.reload(true);
            }
        });
    }

    // Subscribe to Group with group Id Key
    subscribeToGroup(newGroupIdKey: string, length: number) {
        console.log('newGroupIdKey: ' + newGroupIdKey);
        this.getUser().then(function(user) {
            firebase.database().ref().child('users/' + user.userID + '/myGroups/' + user.myGroups.length).set(newGroupIdKey);
        });
    }

    unsubscribeFromGroup(groupIdKey) {
        console.log(groupIdKey);
        const self = this;
        this.getUserID().then(function (uID) {
            self.getUser().then(function (user) {
                let removeRef = null;
                for (let i = 0; i < user.myGroups.length; i++) {
                    if (user.myGroups[i] === groupIdKey) {
                        removeRef = firebase.database().ref('users/' + uID + '/' + 'myGroups/' + i);
                    }
                    if (removeRef !== null) {
                        removeRef.remove()
                            .then(function () {
                                // console.log('was unsubscribed');
                            })
                            .catch(function (error) {
                                console.log('error: ' + error);
                            });
                    }
                }
            });
        });
    }

    userCheckSubscribe(groupID: string) {
        return new Promise<boolean>( resolve => {
            this.getUser().then(function(user) {
                let sub = false;
                console.log('UserGROUPS: ' + user.myGroups.length);
                for (let i = 0; i < user.myGroups.length; i++) {
                    if (user.myGroups[i] === groupID) {
                        console.log('is subbed');
                        sub = true;
                    }
                }
                resolve(sub);
            });
        });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // A method that lets a user create a new group and subscribes them to the new group
    // TODO: Will need checking to verify they have authority to create a group
        createGroup(name: String) {
            return new Promise<any>(resolve => {
                const newGroupIdKey = firebase.database().ref().child('groups').push().key;
                firebase.database().ref('groups/' + newGroupIdKey).set({
                    groupID: newGroupIdKey,
                    groupName: name,
                    threads: ['temporary1', 'temporary2'],
                    users: [firebase.auth().currentUser.uid]
                });
                const self = this;
                this.getUser().then(function(user) {
                    self.subscribeToGroup(newGroupIdKey, user.myGroups.length);
                });
                resolve(newGroupIdKey);
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
