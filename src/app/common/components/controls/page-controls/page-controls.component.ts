import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-controls',
  templateUrl: './page-controls.component.html',
  styleUrls: ['./page-controls.component.scss'],
})
export class PageControlsComponent implements OnInit {
  @Input()
  showCancel: boolean = false;
  
  @Input()
  showDelete: boolean = false;

  @Input()
  showSave: boolean = true;

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCancel: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  handleSave() {
    this.onSave.emit();
  }

  handleCancel() {
    this.onCancel.emit();
  }

  handleDelete() {
    this.onDelete.emit();
  }
}
