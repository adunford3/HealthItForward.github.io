import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ThreadContainerComponent} from './thread-container/thread-container.component';
import {GroupsPageComponent} from './groups-page/groups-page.component';
import {ThreadPageComponent} from './thread-page/thread-page.component';
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import {SurveysComponent} from './surveys/surveys.component';
import {ProfileComponent} from './profile/profile.component';
import {HealthSurveyComponent} from './health-survey/health-survey.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'group-page/:id', component: ThreadContainerComponent},
    {path: 'thread-page/:id', component: ThreadPageComponent},
    {path: 'groups-page', component: GroupsPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'health-survey', component: HealthSurveyComponent},
    {path: 'user', component: UserComponent},
    {path: 'surveys', component: SurveysComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'landing-page', component: LandingPageComponent},
    {path: '', redirectTo: '/landing-page', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
