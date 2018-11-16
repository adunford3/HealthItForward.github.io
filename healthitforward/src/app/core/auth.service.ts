import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) {
    }

    /**
     * Returns a new promise that resolves or rejects the registration of a new user
     * @param value an object that holds the email and password that are to be verified by firebase
     */
    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err));
        });
    }

    /**
     * Returns a promise resolving or rejecting the systems attempt to login a user with a specific
     * email and password
     * @param value An object that holds the email and password that are to be verified by firebase upon login
     */
    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    resolve(res);
                }, err => reject(err));
        });
    }

    /**
     * Returns a new promise that resolves or rejects the system's
     * attempt to log the user out of the system
     */
    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut();
                resolve();
            } else {
                reject();
            }
        });
    }

}
