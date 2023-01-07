import { MenuItem } from './../../../models/menu-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
})
export class FabComponent implements OnInit {
  @Input()
  items: MenuItem[] = [];

  @Input()
  icon = 'add';

  @Input()
  slot = 'fixed';

  @Input()
  vertical = 'bottom';

  @Input()
  horizontal = 'end'
  constructor() {}

  ngOnInit() {}

  async handleItemClick(item: MenuItem) {
    if (item.onClick) {
      await item.onClick();
    }
  }
}
