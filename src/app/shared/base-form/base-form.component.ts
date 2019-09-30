import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.css']
})
export class BaseFormComponent implements OnInit {

  viewBlocked: boolean;
  constructor() { }

  ngOnInit() {
    this.viewBlocked = false;
  }
  blockView() {
    this.viewBlocked = true;
  }
  unblockView() {
    this.viewBlocked = false;
  }
}

