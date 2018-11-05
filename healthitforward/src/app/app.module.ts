import { Component } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, provideRoutes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import {
  HttpClientInMemoryWebApiModule,
  InMemoryBackendConfigArgs
} from 'angular-in-memory-web-api';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThreadContainerComponent} from './thread-container/thread-container.component';
import {ThreadComponent} from './thread/thread.component';
import {HttpClientModule} from '@angular/common/http';
import {InMemoryDataService} from './services/in-memory-data.service';
import {ThreadService} from './services/thread.service';
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from './message.service';
import {NavbarComponent} from './navbar/navbar.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';

import {UserResolver} from './user/user.resolver';
import {AuthGuard} from './core/auth.guard';
import {AuthService} from './core/auth.service';
import {UserService} from './core/user.service';

import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import { SurveysComponent } from './surveys/surveys.component';

import {ProfileComponent} from './profile/profile.component';
import {HealthSurveyComponent} from './health-survey/health-survey.component';

import {VerticalNavbarComponent} from './vertical-navbar/vertical-navbar.component';
import {GroupsPageComponent} from './groups-page/groups-page.component';
import { PreNavbarComponent } from './pre-navbar/pre-navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {GroupService} from './core/group.service';
import {SurveyService} from './core/survey.service';
import {ThreadServices} from './core/thread.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ThreadContainerComponent,
    ThreadComponent,
    MessagesComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    HealthSurveyComponent,
    VerticalNavbarComponent,
    GroupsPageComponent,
    SurveysComponent,
    PreNavbarComponent,
    LandingPageComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,


// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, <InMemoryBackendConfigArgs>{dataEncapsulation: false}
    )
  ],
  providers: [
    ThreadService,
    MessageService,
    AuthService,
    GroupService,
    UserService,
    ThreadServices,
    SurveyService,
    UserResolver,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
