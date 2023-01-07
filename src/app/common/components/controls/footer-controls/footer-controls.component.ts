import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-footer-controls',
  templateUrl: './footer-controls.component.html',
  styleUrls: ['./footer-controls.component.scss'],
})
export class FooterControlsComponent implements OnInit {
  @Input()
  okText: string = $localize`:@@global.ok:Ok`;

  @Input()
  okColor: string = 'primary';

  @Input()
  okLoading: boolean = false;

  @Input()
  showOk: boolean = true;

  @Input()
  cancelText: string = $localize`:@@global.cancel:Cancel`;

  @Input()
  showCancel: boolean = true;

  @Input()
  cancelColor: string = 'cancel';

  @Input()
  deleteText: string = $localize`:@@global.delete:Delete`;

  @Input()
  showDelete: boolean = false;

  @Input()
  disableDelete: boolean = false;

  @Input()
  deleteColor: string = 'danger';

  @Output()
  onConfirm: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCnacel: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  async cancel() {
    this.onCnacel.emit();
  }

  async confirm() {
    this.onConfirm.emit();
  }

  async delete() {
    if(!this.disableDelete){
      this.onDelete.emit();
    }
  }
}
