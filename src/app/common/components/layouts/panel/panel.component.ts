import { CheckboxComponent } from './../../checkbox/checkbox.component';
import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  extra: string;

  @Input()
  description: string;
  constructor() { }

  ngOnInit() {}

}
