import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, provideRoutes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ThreadContainerComponent} from './thread-container/thread-container.component';
import {ThreadComponent} from './thread/thread.component';
import {HttpClientModule} from "@angular/common/http";
import {InMemoryDataService} from "./services/in-memory-data.service";
import {ThreadService} from "./services/thread.service";
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from './message.service';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';

import {UserResolver} from './user/user.resolver';
import {AuthGuard} from './core/auth.guard';
import {AuthService} from './core/auth.service';
import {UserService} from './core/user.service';

import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';


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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,


// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    ThreadService,
    MessageService,
    AuthService,
    UserService,
    UserResolver,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
