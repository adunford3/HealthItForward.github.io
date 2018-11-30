import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../core/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'hif-health-survey',
    templateUrl: './health-survey.component.html',
    styleUrls: ['./health-survey.component.css']
})
export class HealthSurveyComponent implements OnInit {

    //From button
    //routerLink="/dashboard"

    myForm: FormGroup;
    private userID: any;

    constructor(public userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            height: new FormControl(),
            weight: new FormControl(),
            bloodPressure: new FormControl(),
            doesSmoke: new FormControl(),
            doesDrink: new FormControl(),
            medConditions: new FormControl(),
            altTherapies: new FormControl()
        });
    }

    updateUser(value) {
        this.userService.updateUserHealthForum(value);
        this.router.navigate(['/', 'dashboard']);
    }
}
