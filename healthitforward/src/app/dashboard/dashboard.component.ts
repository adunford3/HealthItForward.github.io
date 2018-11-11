import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import {GroupService} from '../core/group.service';
import {SurveyService} from '../core/survey.service';
import {ThreadServices} from '../core/thread.service';

@Component({
  selector: 'hif-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor(
    public userService: UserService,
    public groupService: GroupService,
    public surveyService: SurveyService,
    public threadService: ThreadServices
  ) { }

  ngOnInit() {

    console.log('User ID: ' + this.userService.getUserID());

    const testGroup = this.groupService.getGroup('-LNbI5b4ST0Ytwldnjky').then(function(g) {
      console.log(g);
      return g;
    });

    this.userService.unsubscribeFromGroup('-LNbI5b4ST0Ytwldnjky');

    const thing1 = this.groupService.getGroupThreadIds('GroupID').then(function(v) {
      console.log(v[0]);
    });

    // this.threadService.getGroupThreads(['Thread', 'Thread']).then(function(v) {
    //   console.log(v[0]);
    // });

    this.surveyService.updateClickCount('-LR3DYpnHjNn-5AuJ1Lc', 0).then(function(s) {
      console.log(s);
    });

    // this.threadService.getThread(('Thread')).then(function(t) {
    //   console.log(t);
    // });

    // this.threadService.getThread('Thread');
    // const user = this.userService.getUser().then(function(U) {
    //   console.log('=======User TEST===========');
    //   console.log(U);
    //   return U;
    // });
    // const g = this.groupService.getGroups().then(function(groups) {
    //   console.log('Group Stuff Here:');
    //   console.log(groups);
    //   console.log('groupID: ' + groups[0].groupID);
    //   return groups;
    // });
    // const s = this.surveyService.getSurveys().then(function(surveys) {
    //   console.log('Survey Stuff Here:');
    //   console.log(surveys);
    //   console.log('SurveyName: ' + surveys[0].surveyName);
    //   return surveys;
    // });
    // const u = this.userService.getUsers().then(function(users) {
    //   console.log('User Stuff Here:');
    //   console.log(users);
    //   console.log('UserName: ' + users[0].username);
    //   return users;
    // });
    // const t = this.threadService.getThreads().then(function(threads) {
    //   console.log('Thread Stuff Here:');
    //   console.log(threads);
    //   console.log('ThreadTitle: ' + threads[0].title);
    //   return threads;
    // });
  }

}
