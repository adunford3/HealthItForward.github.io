import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/user.service';
import {UserModel} from '../core/user.model';

@Component({
    selector: 'hif-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    user;

    constructor(public userService: UserService) {
        const u = this.userService.getUser().then(function (user) {
            console.log(user.username);
            return user;
        });
        this.user = Promise.resolve(u);

    }

    ngOnInit() {
    }

}
