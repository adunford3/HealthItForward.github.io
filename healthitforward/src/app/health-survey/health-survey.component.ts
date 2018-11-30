import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
    healthSurvey = ['', '', '', '', '', '', ''];
    private userID: any;

    constructor(public userService: UserService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        console.log('Something');
        this.myForm = this.fb.group({
            height: new FormControl(),
            weight: new FormControl(),
            bloodPressure: new FormControl(),
            doesSmoke: new FormControl(),
            doesDrink: new FormControl(),
            medConditions: new FormControl(),
            altTherapies: new FormControl()
        });
        console.log(this.myForm);
    }

    getDateToString() {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1; // January is 0!
        const yyyy = today.getFullYear();

        let day = '' + dd;
        if (dd < 10) {
            day = '0' + dd;
        }

        let month = '' + mm;
        if (mm < 10) {
            month = '0' + mm;
        }

        const timeStamp = month + '|' + day + '|' + yyyy;
        return timeStamp;
    }

    updateUser(value) {
        console.log('Testing Health Forum: ');
        const height = this.myForm.controls['height'].value;
        const weight = this.myForm.controls['weight'].value;
        const bloodPressure = this.myForm.controls['bloodPressure'].value;
        const doesSmoke = this.myForm.controls['doesSmoke'].value;
        const doesDrink = this.myForm.controls['doesDrink'].value;
        const medConditions = this.myForm.controls['medConditions'].value;
        const altTherapies = this.myForm.controls['altTherapies'].value;

        const date = this.getDateToString();
        this.healthSurvey = [
            date,
            height,
            weight,
            bloodPressure,
            doesSmoke,
            doesDrink,
            medConditions,
            altTherapies
        ];
        console.log(this.healthSurvey);
        this.userService.updateUserHealthForum(this.healthSurvey);
        const self = this;
        this.userService.getUser().then(function (user) {
            if (user.healthForm === null) {
                self.router.navigate(['/', 'dashboard']);
            } else {
                self.router.navigate(['/', 'profile']);
            }
        });

    }
}
