import { Injectable } from "@angular/core";

import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";

import {Thread} from "../thread/thread";
import {THREADS} from "../mock-threads";

import {MessageService} from "../message.service";

@Injectable()
export class ThreadService {

  constructor(private messageService: MessageService) {}

  getThread(): Observable<Thread[]> {
    this.messageService.add("Thread Service: fetched mock threads");
    return of(THREADS);
  }
}
