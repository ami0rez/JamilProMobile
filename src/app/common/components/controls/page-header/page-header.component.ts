import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input()
  defaultHref = '/home/dashboard';

  @Input()
  showBackIcon = true;

  @Input()
  custom = false;

  @Input()
  icon: string = 'close';

  @Input()
  title: string;

  @Input()
  translucent: boolean;

  @Input()
  collapse: string = 'fade';

  @Output()
  onIconClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  handleClickIcon() {
    this.onIconClick.emit();
  }
}
