import {Component, Input, OnInit} from '@angular/core';

import {ThreadComponent} from "../thread/thread.component";
import {GroupModel} from '../core/group.model';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GroupService} from '../core/group.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'hif-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit {

  subscribed: boolean;
  // group: GroupModel;
  group;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: GroupService
  ) {
      this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit() {
      const g = this.service.getGroup('-LNbI5b4ST0Ytwldnjky').then(function(group) {
          // console.log('Vertical Navbar groups loaded');
          return group;
      });
      // this.group = Promise.resolve(g);
      const f = this.route.paramMap.pipe(
          switchMap((params: ParamMap) =>
              Promise.resolve(this.service.getGroup(params.get('id')).then(function(group) {
                  return group;
              })))
      );
      this.group = f;
      console.log(this.group);
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
