import { Component, OnInit } from '@angular/core';
import {GroupService} from '../core/group.service';

@Component({
  selector: 'hif-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.css']
})
export class VerticalNavbarComponent implements OnInit {
    groups;

  constructor(
      public groupService: GroupService
  ) { }

  ngOnInit() {
      const g = this.groupService.getGroups().then(function(groups) {
          console.log('Vertical Navbar groups loaded');
          return groups;
      });
      this.groups = Promise.resolve(g);
  }

}
