import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
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

  getSurveys() {
    return new Promise<SurveyModel[]>( (resolve) => {
      const ref = firebase.database().ref('surveys/');
      ref.once('value').then(function(snapshot) {
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
    const surveys = this.getSurveys();
    const user = this.userService.getUser();
    Promise.all([surveys, user]).then(function(values) {
      console.log(values);
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
