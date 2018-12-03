import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GroupService} from '../core/group.service';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../core/user.service';
import {ThreadServices} from "../core/thread.service";
import {ThreadModel} from '../core/thread.model';
import {GroupModel} from "../core/group.model";

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
    selectedThread: ThreadModel;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: GroupService,
                private userService: UserService,
                private threadService: ThreadServices) {
        this.route.params.subscribe(params => this.paramGroupID = params["id"]);
        const g = this.service.getGroup(this.paramGroupID).then(function (group) {
            console.log(group);
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
        const self = this;
        let gThreads = this.group.then((group: any) => {
            return group.threads;
        });
        this.threads = gThreads.then((threads) => {
            console.log(threads);
            let tArr = [];
            if (threads.length != null) {
                for (let i = 0; i < threads.length; i++) {
                    //threads[i].body = self.parseBody(threads[i].body);
                    tService.getThread(threads[i]).then(function(thread) {
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

    onSelect(thread: ThreadModel): void {
        this.selectedThread = thread;
        console.log(this.selectedThread);
        const self = this;
        self.userService.updateThreads(this.selectedThread.threadID);
        this.router.navigate(['/thread-page', thread.threadID]);
    }

    subscribeToGroup() {
        this.subscribed = true;
        document.getElementById('subscribe').style.backgroundColor = 'gray';
        document.getElementById('unsubscribe').style.backgroundColor = '#336699';
        console.log(this.paramGroupID);
        const self = this;
        this.userService.subscribeToGroup(self.paramGroupID);
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

    addThread(body: string, link: string, creatorID: string, replyChain: string[], threadID: string, title: string, upvotes: string) {
        // let newThread = new ThreadModel(body, creatorID, replyChain, threadID, title, upvotes);
        const self = this;
        //Append the thread body with the optional youtube link id
        body += '~' + this.findURLID(link);
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

    /**
     * Finds the id in a YouTube url to later add it to the thread body.
     * @param link The YouTube link provided by the user.
     */
    findURLID(link: string) {
        let urlID = '';
        let anID = '';
        // Get the last bit of the URL to save as the url ID
        for (let i = link.length - 1; i >= 0; i--) {
            if (link.charAt(i) === '=' || link.charAt(i) === '/') {
                break;
            }
            anID += link.charAt(i);
        }
        for (let i = anID.length - 1; i >= 0; i--) {
            urlID += anID.charAt(i);
        }
        return urlID;
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
