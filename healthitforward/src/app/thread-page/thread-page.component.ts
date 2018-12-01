import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ThreadServices} from "../core/thread.service";
import {ThreadModel} from '../core/thread.model';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'hif-thread-page',
  templateUrl: './thread-page.component.html',
  styleUrls: ['./thread-page.component.css']
})
export class ThreadPageComponent implements OnInit {

    urlID = '';
    loadVideo = false;
    paramThreadID;
    thread;
    title;
    body;
    linkID;

    constructor(private sanitizer: DomSanitizer,
                private threadService: ThreadServices,
                private route: ActivatedRoute,
                private router: Router,) {
        this.route.params.subscribe(params => this.paramThreadID = params["id"]);
        const self = this;
        const t = this.threadService.getThread(this.paramThreadID).then(function (thread) {
            console.log(thread);
            return thread;
        });
        this.thread = Promise.resolve(t);
        this.thread.then(function(thread) {
            document.getElementById('title').innerHTML = thread.title;
            document.getElementById('body').innerHTML = self.parseBody(thread.body);
            return thread;
        });

    }

    ngOnInit() {

    }

    /**
     * Returns a YouTube link which can be embedded in html.
     */
    getEmbedURL() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.urlID);
    }

    /**
     * Parses the thread body from the database at the "~" characterto separate the body from
     * the YouTube link id.
     * @param body The thread body from the database.
     */
    parseBody(body: string): string {
        let newBody = '';
        let bool = false;
        for (let i = 0; i < body.length; i++) {
            if (bool) {
                this.urlID += body.charAt(i);
            }
            if (body.charAt(i) === '~') {
                bool = true;
                newBody = body.substring(0, i);
            }
        }

        //Only load videos if there's a valid url ID
        if (this.urlID.length > 0) {
            this.loadVideo = true;
        }
        console.log(this.urlID);
        return newBody;
    }

}
