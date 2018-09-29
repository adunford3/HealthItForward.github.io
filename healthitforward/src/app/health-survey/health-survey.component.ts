import { NgModule, Component, Pipe, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {UserService} from '../core/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'hif-health-survey',
  templateUrl: './health-survey.component.html',
  styleUrls: ['./health-survey.component.css']
})
export class HealthSurveyComponent implements OnInit {

  myform: FormGroup;
  private userID: any;

  constructor(
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myform = new FormGroup({
      height: new FormControl(),
      weight: new FormControl()
    });
  }
}
