import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThreadContainerComponent } from './thread-container/thread-container.component';
import { ThreadComponent } from './thread/thread.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ThreadContainerComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
