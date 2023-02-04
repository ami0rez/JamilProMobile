import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @Input()
  src = '';

  @Input()
  defaultImage = '';

  @Input()
  defaultText = '';

  @Output()
  imageClicked = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  handleImageClicked() {
    this.imageClicked.next(null);
  }
}
