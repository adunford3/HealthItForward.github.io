import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hif-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit {

  items: any[] = [
    { title: 'Thread 1' },
    { title: 'Thread 2' },
    { title: 'Thread 3' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
