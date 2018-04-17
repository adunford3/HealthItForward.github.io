import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {ThreadContainerComponent} from "./thread-container/thread-container.component";

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'group-page', component: ThreadContainerComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
