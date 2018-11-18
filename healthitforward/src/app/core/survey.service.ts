import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AngularFireDatabase} from 'angularfire2/database';
import {SurveyModel} from './survey.model';
import {UserService} from './user.service';

@Injectable()
export class SurveyService {

    constructor(public db: AngularFireDatabase,
                public afAuth: AngularFireAuth,
                public userService: UserService
    ) {
    }

    /**
     * Returns a new promise with an array of all the surveyModels stored on the database
     * @return A promise of all surveys on database
     */
    getSurveys() {
        return new Promise<SurveyModel[]>((resolve) => {
            const ref = firebase.database().ref('surveys/');
            ref.once('value').then(function (snapshot) {
                const surveys = [];
                let i = 0;
                snapshot.forEach(function (childSnapshot) {
                    const clickCount = childSnapshot.child('clickCount').val();
                    const groupTags = childSnapshot.child('groupTags').val();
                    const surveyID = childSnapshot.child('surveyID').val();
                    const surveyName = childSnapshot.child('surveyName').val();
                    const surveyURL = childSnapshot.child('surveyURL').val();

                    const s = new SurveyModel(clickCount, groupTags, surveyID, surveyName, surveyURL);

                    surveys[i++] = s;
                });
                resolve(surveys);
            });
        });
    }


    getUserSurveys() {
        const user = this.userService.getUser();
        const surveys = this.getSurveys();
        return Promise.all([user, surveys]).then(function (values) {
            let userSurveys = [];
            let i = 0;
            values[1].forEach(function (surveyAll) {
                values[0].mySurveys.forEach(function (surveyUser) {
                    if (surveyUser === surveyAll.surveyID) {
                        console.log('FOUND A MATCH');
                        userSurveys[i++] = surveyAll;
                    }
                });
            });
            // console.log(userSurveys);
            this.resolve(userSurveys);
        });
    }

    /**
     * Returns a promise that resolves the firebase call to update a specific survey's clickCount by one
     * @param surveyId The ID of the survey that needs its clickCount updated
     * @param oldCount The old number of clicks that will be updated
     */
    updateClickCount(surveyId: string, oldcount: number) {
        return new Promise<any>(resolve => {
            const surveyRef = firebase.database().ref('surveys/' + surveyId + '/clickCount');
            surveyRef.set(oldcount + 1).then(res => {
                resolve(res);
            });
        });
    }

    /**
     * Returns a promise resolving the firebase call to write a new survey to the database
     * @param survey A surveyModel that should be written to the database
     */
    addSurvey(survey: SurveyModel) {
        return new Promise<any>(resolve => {
            const surveyId = firebase.database().ref().child('surveys').push().key;
            firebase.database().ref('surveys/' + surveyId).set({
                clickCount: survey.clickCount,
                groupTags: survey.groupTags,
                surveyID: surveyId,
                surveyName: survey.surveyName,
                surveyURL: survey.surveyURL
            }).then(res => {
                resolve(res);
            });
        });
    }

}
