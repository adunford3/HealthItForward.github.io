import {Component, Input, OnInit} from '@angular/core';

import {ThreadComponent} from "../thread/thread.component";
import {GroupModel} from '../core/group.model';

@Component({
  selector: 'hif-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit {

  subscribed: boolean;
  group: GroupModel;


  constructor() { }

  ngOnInit() {
    this.subscribed = false;
    document.getElementById("unsubscribe").style.backgroundColor = "gray";
  }

  subscribeToGroup() {
    this.subscribed = true;
    document.getElementById("subscribe").style.backgroundColor = "gray";
    document.getElementById("unsubscribe").style.backgroundColor = "#336699";
    alert("Subscribed to Parkinson's Patient Group!");
  }

  unsubscribeFromGroup() {
    this.subscribed = false;
    document.getElementById("unsubscribe").style.backgroundColor = "gray";
    document.getElementById("subscribe").style.backgroundColor = "#336699";
    alert("Unsubscribed from Parkinson's Patient Group.");
  }

  hasSubscribed() {
    return this.subscribed;
  }
}
