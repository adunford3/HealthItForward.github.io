import {Component} from '@angular/core';
import {UserService} from '../core/user.service';
import {GroupService} from '../core/group.service';
import {SurveyService} from '../core/survey.service';
import {ThreadServices} from '../core/thread.service';
import {ThreadModel} from '../core/thread.model';
import {Router} from '@angular/router';

@Component({
    selector: 'hif-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    threads;
    selectedThread: ThreadModel;

    constructor(public userService: UserService,
                public groupService: GroupService,
                public router: Router,
                public surveyService: SurveyService,
                public threadService: ThreadServices) {
        const self = this;
        const t = this.userService.getUser().then(function (user) {
        });
        this.threads = Promise.resolve(t);
    }

    ngOnInit() {

        console.log('User ID: ' + this.userService.getUserID());

        const testGroup = this.groupService.getGroup('-LNbI5b4ST0Ytwldnjky').then(function (g) {
            console.log(g);
            return g;
        });

        const thing1 = this.groupService.getGroupThreadIds('GroupID').then(function (v) {
            console.log(v[0]);
        });
        console.log(this.userService.getUser());
    }

    onSelect(thread: ThreadModel): void {
        this.selectedThread = thread;
        console.log(this.selectedThread);
        const self = this;
        self.userService.updateThreads(this.selectedThread.threadID);
        this.router.navigate(['/thread-page', thread.threadID]);
    }

}
