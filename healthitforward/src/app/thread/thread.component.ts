import {Component, Input, OnInit} from '@angular/core';
import {Thread} from "./thread";
// import { THREADS } from "../mock-threads";

import {ThreadService} from "../services/thread.service";

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

  constructor(private threadService: ThreadService) { }

  ngOnInit() {
    this.getThreads();
  }

  onSelect(thread: Thread ): void {
    this.selectedThread = thread;
  }

  getThreads(): void {
    this.threadService.getThread().subscribe(threads => this.threads = threads);
  }
}
