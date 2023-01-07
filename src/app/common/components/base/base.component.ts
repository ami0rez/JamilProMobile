import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";


@Component({
  selector: 'app-base-component',
  template: '',
  styles: [''],
})
export class BaseComponent implements OnInit {

  constructor(
    private location: Location) { }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
