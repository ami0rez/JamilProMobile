import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @Input()
  title;

  @Input()
  icon;

  @Input()
  description;

  @Input()
  route;

  @Input()
  seen: boolean;

  @Output()
  onCheckboxChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  //Go to specefic page
  navigate() {
    this.router.navigate([this.route]);
  }
}
