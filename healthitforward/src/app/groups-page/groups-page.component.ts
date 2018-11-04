import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';
import {GroupService} from "../core/group.service";
import {GroupModel} from "../core/group.model";

@Component({
  selector: 'hif-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.css']
})
export class GroupsPageComponent implements OnInit {

  groups;

  constructor(
    public userService: UserService,
    public groupService: GroupService
  ) {}

  ngOnInit() {
    const g = this.groupService.getGroups().then(function(groups) {
      console.log('Group Stuff Here:');
      console.log(groups);
      console.log('groupID: ' + groups[0].groupID);
      return groups;
    });
    this.groups = Promise.resolve(g);

    console.log(this.groups);
  }

  createGroup(groupTitle: String) {
    this.userService.createGroup(groupTitle);

    alert('New group created!');
  }
}
