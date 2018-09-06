import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ThreadContainerComponent} from "./thread-container/thread-container.component";
import {LoginComponent} from './login/login.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './register/register.component';
import {UserResolver} from './user/user.resolver';
import {AuthGuard} from './core/auth.guard';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'group-page', component: ThreadContainerComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
