import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GroupService} from '../core/group.service';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../core/user.service';

@Component({
    selector: 'hif-thread-container',
    templateUrl: './thread-container.component.html',
    styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit {

<<<<<<< HEAD
  subscribed: boolean;
  // group: GroupModel;
  public groupId: string;
  group;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private service: GroupService,
      private userService: UserService
  ) {
      this.route.params.subscribe(params => console.log(params));
      const f = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
          Promise.resolve(this.service.getGroup(params.get('id')).then(function(group) {
            return group;
          })))
      );
      this.group = f;
      this.groupId = this.group.groupID;
      console.log(this.groupId);
      console.log(this.group);
  }

  ngOnInit() {
      const g = this.service.getGroup('-LNbI5b4ST0Ytwldnjky').then(function(group) {
          // console.log('Vertical Navbar groups loaded');
          return group;
      });
      // this.group = Promise.resolve(g);

    this.subscribed = false;
    document.getElementById("unsubscribe").style.backgroundColor = "gray";
  }

  async subscribeToGroup() {
    this.subscribed = true;
    document.getElementById('subscribe').style.backgroundColor = 'gray';
    document.getElementById('unsubscribe').style.backgroundColor = '#336699';
    console.log(await this.groupId);
    // this.userService.subscribeToGroup(this.group.groupID);
    alert("Subscribed to Parkinson's Patient Group!");
  }
=======
    subscribed: boolean;
    // group: GroupModel;
    paramGroupID;
    group;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: GroupService,
                private userService: UserService) {
        this.route.params.subscribe(params => console.log(params));
    }

    ngOnInit() {
        const g = this.service.getGroup('-LNbI5b4ST0Ytwldnjky').then(function (group) {
            // console.log('Vertical Navbar groups loaded');
            return group;
        });
        // this.group = Promise.resolve(g);
        const f = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                Promise.resolve(this.service.getGroup(params.get('id')).then(function (group) {
                    return group;
                })))
        );
        this.group = f;
        console.log(this.group);
        const paramTest = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                const pId = params.get('id');
                console.log("pID: " + pId);
                return pId;
            })
        );
        this.paramGroupID = paramTest;
        console.log("param id: " + this.paramGroupID);
        this.subscribed = false;
        document.getElementById("unsubscribe").style.backgroundColor = "gray";
    }

    subscribeToGroup() {
        this.subscribed = true;
        document.getElementById('subscribe').style.backgroundColor = 'gray';
        document.getElementById('unsubscribe').style.backgroundColor = '#336699';
        console.log(this.group.groupID);
        this.userService.subscribeToGroup(this.group.groupID);
        alert("Subscribed to Parkinson's Patient Group!");
    }
>>>>>>> 88ed70fff5b37692d06567443d7a35ecf70a420b

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
