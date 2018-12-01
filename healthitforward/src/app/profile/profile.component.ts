import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {UserModel} from '../core/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'hif-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user;

    constructor(public userService: UserService,
                private router: Router) {
        const u = this.userService.getUser().then(function (user) {
            document.getElementById('username').innerHTML = user.username;
            document.getElementById('date').innerHTML = user.healthForm[user.healthForm.length - 1][0];
            document.getElementById('height').innerHTML = user.healthForm[user.healthForm.length - 1 ][1];
            document.getElementById('weight').innerHTML = user.healthForm[user.healthForm.length - 1][2];
            document.getElementById('bp').innerHTML = user.healthForm[user.healthForm.length - 1][3];
            document.getElementById('smoke').innerHTML = user.healthForm[user.healthForm.length - 1][4];
            document.getElementById('alcohol').innerHTML = user.healthForm[user.healthForm.length - 1][5];
            document.getElementById('mc').innerHTML = user.healthForm[user.healthForm.length - 1][6];
            document.getElementById('at').innerHTML = user.healthForm[user.healthForm.length - 1][7];

            return user;
        });
        this.user = Promise.resolve(u);

    }

    ngOnInit() {
    }

    goToHealthSurvey() {
        this.router.navigate(['/', 'health-survey'])
    }

}
