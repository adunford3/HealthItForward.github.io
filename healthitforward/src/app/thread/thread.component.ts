import {Component, Input, OnInit} from '@angular/core';
import {Thread} from "./thread";
import { THREADS } from "../mock-threads";

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

  threads = THREADS;

  constructor() { }

  ngOnInit() {
  }

}
