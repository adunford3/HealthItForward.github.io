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

    user;
    threads;
    selectedThread: ThreadModel;

    constructor(public userService: UserService,
                public groupService: GroupService,
                public router: Router,
                public surveyService: SurveyService,
                public threadService: ThreadServices) {
        const self = this;
        this.user = this.userService.getUser().then(function (user) {
            return user;
        });
        let gThreads = this.user.then((user: any) => {
            return user.myThreads;
        });
        this.threads = gThreads.then((threads) => {
            console.log(threads);
            let tArr = [];
            if (threads.length != null) {
                for (let i = 0; i < threads.length; i++) {
                    threadService.getThread(threads[i]).then(function(thread) {
                        tArr.push(thread);
                    });
                }
            }
            return tArr;
        })
            .then((threads) => {
                console.log(threads);
                return threads;
            });
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

    /**
     * Parses the thread body from the database at the "~" character to separate the body from
     * the YouTube link id.
     * @param body The thread body from the database.
     */
    parseBody(body: string): string {
        if (body === null) {
            return;
        }
        let newBody = '';
        for (let i = 0; i < body.length; i++) {
            if (body.charAt(i) === '~') {
                newBody = body.substring(0, i);
                break;
            }
        }
        console.log(body);
        return newBody;
    }

}
