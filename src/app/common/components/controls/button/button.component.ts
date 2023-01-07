import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input()
  text: string = $localize`:@@global.ok:Ok`;

  @Input()
  color: string = 'primary';

  @Input()
  style: 'simple' | 'large' = 'simple';

  @Input()
  disabled: boolean = false;
  constructor() {}

  ngOnInit() {}
}
