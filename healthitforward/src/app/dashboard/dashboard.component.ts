import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/user.service';

@Component({
  selector: 'hif-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {

  }

}
