import {Component, Input, OnInit} from '@angular/core';

import {ThreadComponent} from "../thread/thread.component";

@Component({
  selector: 'hif-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
