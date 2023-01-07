import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
})
export class SeparatorComponent implements OnInit {
  @Input()
  borderHeight: number = 3;

  @Input()
  horizentalSpacing: number = 10;

  @Input()
  verticalSpacing: number = 0;

  @Input()
  color: string = '#948d8d';

  @Input()
  dashed: boolean = false;

  @HostBinding('style.height.px')
  elHeight: number;

  innerWidth: any;
  constructor() {}

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
  }
}
