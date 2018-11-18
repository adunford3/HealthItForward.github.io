import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GroupService} from '../core/group.service';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../core/user.service';
import {ThreadServices} from "../core/thread.service";

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
    }

    ngOnInit() {
        const g = this.service.getGroup(this.paramGroupID).then(function (group) {
            console.log(group);
            return group;
        });
        // this.group = Promise.resolve(g);
        // const f = this.route.paramMap.pipe(
        //     switchMap((params: ParamMap) =>
        //         Promise.resolve(this.service.getGroup(params.get('id')).then(function (group) {
        //             return group;
        //         })))
        // );
        this.group = Promise.resolve(g);
        this.threadIds = this.group.threads;
        // this.threads = this.getThreads();
        console.log("paramGroupID: " + this.paramGroupID);
        this.subscribed = false;
        document.getElementById('unsubscribe').style.backgroundColor = 'gray';
    }

    // getThreads() {
    //     let threads: any[];
    //     new Promise(this.threadIds.forEach(thread => {
    //             const t = this.threadService.getThread(thread).then(function(thread) {
    //                 return thread;
    //             });
    //             let currThread = Promise.resolve(t);
    //             threads.push(currThread);
    //         });
    //     )
    //     console.log(threads);
    //     return threads;
    // }

    subscribeToGroup() {
        this.subscribed = true;
        document.getElementById('subscribe').style.backgroundColor = 'gray';
        document.getElementById('unsubscribe').style.backgroundColor = '#336699';
        console.log(this.group.groupID);
        this.userService.subscribeToGroup(this.group.groupID);
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
}
