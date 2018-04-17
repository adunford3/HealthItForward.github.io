import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hif-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  @Input()
  items: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
