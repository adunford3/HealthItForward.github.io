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
                public userService: UserService) {
    }

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

    updateClickCount(surveyId: string, oldcount: number) {
        return new Promise<any>(resolve => {
            const surveyRef = firebase.database().ref('surveys/' + surveyId + '/clickCount');
            surveyRef.set(oldcount + 1).then(res => {
                resolve(res);
            });
        });
    }

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
