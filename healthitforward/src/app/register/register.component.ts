import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../core/user.service';

@Component({
    selector: 'hif-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(public authService: AuthService,
                public userService: UserService,
                private router: Router,
                private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
    }

    /**
     * Creates the register form for the user to enter their email, username, and password.
     */
    createForm() {
        this.registerForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            username: ['', Validators.required]
        });
    }

    /**
     * Attempts to authenticate the user to register..
     * @param value The user input taken from the registration form containing their email, username,
     * and password.
     */
    tryRegister(value) {
        this.authService.doRegister(value)
            .then(res => {
                console.log(res);
                this.errorMessage = '';
                this.successMessage = 'Your account has been created';
                this.registerToDatabase();
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
                this.successMessage = '';
            });
    }

    /**
     * Adds the newly registered user to the database.
     */
    registerToDatabase() {
        this.userService.addUser(this.registerForm.controls['username'].value,
            this.registerForm.controls['email'].value,
            this.registerForm.controls['password'].value);
        this.router.navigate(['/', 'health-survey']);
    }

}
