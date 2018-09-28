import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ThreadContainerComponent} from "./thread-container/thread-container.component";
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import {UserResolver} from './user/user.resolver';
import {AuthGuard} from './core/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {HealthSurveyComponent} from './health-survey/health-survey.component';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'group-page', component: ThreadContainerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'health-survey', component: HealthSurveyComponent},
  {path: 'user', component: UserComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
