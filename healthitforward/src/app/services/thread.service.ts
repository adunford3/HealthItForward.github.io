import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {Thread} from '../thread/thread';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {catchError, tap} from 'rxjs/operators';

import {MessageService} from '../message.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ThreadService {

    private threadsUrl = 'api/threads';

    constructor(private http: HttpClient,
                private messageService: MessageService) {
    }

    getThread(): Observable<Thread[]> {
        return this.http.get<Thread[]>(this.threadsUrl)
            .pipe(
                tap(threads => this.log('fetched threads')),
                catchError(this.handleError('getThread', []))
            );
    }

    /** POST: add a new thread to the server */
    addThread(thread: Thread): Observable<Thread> {
        return this.http.post<Thread>(this.threadsUrl, thread, httpOptions).pipe(
            tap((thread: Thread) => this.log(`added thread w/ body: ${thread.content}`)),
            catchError(this.handleError<Thread>('addThread'))
        );
    }

    private log(message: string) {
        this.messageService.add('ThreadService: ' + message);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
