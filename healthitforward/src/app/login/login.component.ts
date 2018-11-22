import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../core/user.service';

@Component({
    selector: 'hif-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: string = '';

    constructor(public authService: AuthService,
                public userService: UserService,
                private router: Router,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
    }

    /**
     * Creates the login form for the user to enter their email and password.
     */
    createForm() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    /**
     * Attempts to authenticate the user to login.
     * @param value The user input taken from the login form containing their email and password.
     */
    tryLogin(value) {
        this.authService.doLogin(value)
            .then(res => {
                this.userService.getCurrentUser();
                this.router.navigate(['/dashboard']);
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
            });
    }
}
