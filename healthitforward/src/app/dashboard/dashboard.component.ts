import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import {GroupService} from "../core/group.service";

@Component({
  selector: 'hif-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    public userService: UserService,
    public groupService: GroupService
  ) { }

  ngOnInit() {
    let promise = this.groupService.getGroups().then(function(group) {
      console.log(group);
      console.log("groupID: " + group[0].groupID);
      return group;
    });
  }

}
