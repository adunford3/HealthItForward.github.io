import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GroupService} from '../core/group.service';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../core/user.service';
import {ThreadServices} from "../core/thread.service";
import {ThreadModel} from '../core/thread.model';

@Component({
    selector: 'hif-thread-container',
    templateUrl: './thread-container.component.html',
    styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit {


    subscribed: boolean;
    // group: GroupModel;
    paramGroupID;
    group;
    threadIds;
    threads;
    currThread;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: GroupService,
                private userService: UserService,
                private threadService: ThreadServices) {
        this.route.params.subscribe(params => this.paramGroupID = params["id"]);
        const g = this.service.getGroup(this.paramGroupID).then(function (group) {
            // console.log(group);
            return group;
        });
        this.group = Promise.resolve(g);
        const tIds = this.service.getGroupThreadIds(this.paramGroupID).then(function(threadIds) {
            // console.log("Group threadIds: " + threadIds);
            return threadIds;
        });
        this.threadIds = Promise.resolve(tIds);
    }

    ngOnInit() {
        console.log("threadIds = " + this.threadIds.then(threads => this.threads = this.getGroupThreads(threads)));
        // console.log(this.threads);
        this.subscribed = false;
        // this.threads = this.getGroupThreads(this.threadIds.then(threads => threads));
        // console.log("NgOnInit thread call: " + this.threads);
        // document.getElementById('unsubscribe').style.backgroundColor = 'gray';
    }

    async getGroupThreads(threadIds: string[]) {
        console.log("getGroupThreads: " + threadIds);
      let threads = [];
      let i = 0;
      const self = this;
      threadIds.forEach(async function(threadId) {
        const threadPromise = await self.threadService.getThread((threadId));
        threads[i++] = await Promise.resolve((threadPromise));
        console.log("Thread is: " + Promise.resolve((threadPromise)).toString());
      });
        return Promise.all(threads).then(function(values) {
            console.log(values);
            let threadArr = [];
            let i = 0;
            values.forEach(function() {
                threadArr[i++] = values[i];
                console.log(values[i]);
            });
            this.resolve(threadArr);
        });
      // let newThread = await threads;
      // console.log("nweArray: " + await newThread);
      // return newThread;
    }

    subscribeToGroup() {
        this.subscribed = true;
        document.getElementById('subscribe').style.backgroundColor = 'gray';
        document.getElementById('unsubscribe').style.backgroundColor = '#336699';
        console.log(this.paramGroupID);
        this.userService.subscribeToGroup(this.paramGroupID);
        alert('Subscribed to Parkinson\'s Patient Group!');
    }

    unsubscribeFromGroup() {
        this.subscribed = false;
        document.getElementById('unsubscribe').style.backgroundColor = 'gray';
        document.getElementById('subscribe').style.backgroundColor = '#336699';
        alert('Unsubscribed from Parkinson\'s Patient Group.');
    }

    hasSubscribed() {
        return this.subscribed;
    }

    addThread(body: string, creatorID: string, replyChain: string[], threadID: string, title: string, upvotes: string) {
        let newThread = new ThreadModel(body, creatorID, replyChain, threadID, title, upvotes);
        this.threadService.addThread(newThread);
        console.log("New Thread created");
    }
}
