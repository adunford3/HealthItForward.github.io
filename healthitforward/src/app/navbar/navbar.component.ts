import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
import {Router, Params} from '@angular/router';

@Component({
  selector: 'hif-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.doLogout();
    this.router.navigate(['/', 'landing-page']);
  }

}
