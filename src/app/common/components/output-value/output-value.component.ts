import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-output-value',
  templateUrl: './output-value.component.html',
  styleUrls: ['./output-value.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OutputValueComponent),
      multi: true,
    },
  ],
})
export class OutputValueComponent implements ControlValueAccessor {
  @Input()
  label: string;

  @Input()
  suffix: string;

  @Input()
  extra: string;

  @Input()
  showLabel: boolean = true;

  outputValue: number;
  constructor() {}

  set value(val) {
    this.outputValue = val;
  }

  get value(): any {
    return this.outputValue;
  }

  writeValue(value: any) {
    this.outputValue = value;
  }
  registerOnChange(fn: any) {}

  registerOnTouched(fn: any) {}
}
