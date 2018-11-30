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
        const self = this;
        this.service.userService.userCheckSubscribe(this.paramGroupID).then(function(subbed) {
            self.subscribed = subbed;
            console.log(subbed);
            if (subbed === true) {
                document.getElementById('subscribe').style.backgroundColor = 'gray';
                document.getElementById('unsubscribe').style.backgroundColor = '#336699';
            } else {
                document.getElementById('subscribe').style.backgroundColor = '#336699';
                document.getElementById('unsubscribe').style.backgroundColor = 'gray';
            }
        });
        // this.subscribed = false;
        console.log(this.subscribed);
        this.getGroupThreads();
    }

    getGroupThreads() {
        let tService = this.threadService;
        let gThreads = this.group.then((group: any) => {
            return group.threads;
        });
        this.threads = gThreads.then((threads) => {
            console.log(threads);
            let tArr = [];
            for (let i = 0; i < threads.length; i++) {
               tService.getThread(threads[i]).then(function(thread) {
                   tArr.push(thread);
               });
            }
            return tArr;
        })
            .then((threads) => {
                console.log(threads);
                return threads;
            });
    }

    subscribeToGroup() {
        this.subscribed = true;
        document.getElementById('subscribe').style.backgroundColor = 'gray';
        document.getElementById('unsubscribe').style.backgroundColor = '#336699';
        console.log(this.paramGroupID);
        const self = this;
        this.userService.getUser().then(function(user) {
           console.log('here: ' + user.myGroups.length);
            self.userService.subscribeToGroup(self.paramGroupID, user.myGroups.length);
        });
        alert('Subscribed to Parkinson\'s Patient Group!');
    }

    unsubscribeFromGroup() {
        this.subscribed = false;
        document.getElementById('unsubscribe').style.backgroundColor = 'gray';
        document.getElementById('subscribe').style.backgroundColor = '#336699';
        this.userService.unsubscribeFromGroup(this.paramGroupID);
        alert('Unsubscribed from Parkinson\'s Patient Group.');
    }

    hasSubscribed() {
        return this.subscribed;
    }

    addThread(body: string, creatorID: string, replyChain: string[], threadID: string, title: string, upvotes: string) {
        // let newThread = new ThreadModel(body, creatorID, replyChain, threadID, title, upvotes);
        const self = this;
        this.userService.getUser().then(function(user) {
            const newThread = new ThreadModel(body, user.userID, replyChain, threadID, title, '0');
            const test = self.threadService.addThread(newThread);
            // console.log(Promise.resolve(test));
            self.threadIds.then(function(ids) {
                test.then(function(threadId) {
                    self.service.updateThreads(self.paramGroupID, ids.length, threadId);
                    self.userService.updateThreads(threadId);
                    // console.log("Testing here: " + threadId);
                    // console.log('maybewillwork: '+ ids.length);
                    return threadId;
                })
                // console.log(ids.length);
                return ids.length;
            })
                .then((length) => { return length; });
            // this.service.updateThreads(this.paramGroupID, ids);
            console.log('New Thread created');
        });
    }
}
