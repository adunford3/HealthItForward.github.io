import {Component, OnInit} from '@angular/core';
import {Thread} from './thread';
import {ThreadService} from '../services/thread.service';

// import { THREADS } from "../mock-threads";

@Component({
    selector: 'hif-thread',
    templateUrl: './thread.component.html',
    styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

    // thread: Thread = {
    //   id: 1,
    //   title: 'Thread Title',
    //   content: 'This is the thread content.'
    // };

    threads: Thread[];

    selectedThread: Thread;

    constructor(private threadService: ThreadService) {
    }

    ngOnInit() {
        this.getThreads();
    }

    onSelect(thread: Thread): void {
        this.selectedThread = thread;
    }

    getThreads(): void {
        this.threadService.getThread().subscribe(threads => this.threads = threads);
    }

    add(title: string, content: string): void {
        title = title.trim();
        if (!title || !content) {
            return;
        }
        this.threadService.addThread(({title, content}) as Thread)
            .subscribe(thread => {
                this.threads.push(thread);
            });
    }
}
