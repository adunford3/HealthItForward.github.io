import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';

@Component({
  selector: 'hif-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.css']
})
export class GroupsPageComponent implements OnInit {

  constructor(
    public userService: UserService,
  ) {}

  ngOnInit() {
  }

  createGroup(groupTitle: String) {
    this.userService.createGroup(groupTitle);

    alert("New group created!");
  }
}
