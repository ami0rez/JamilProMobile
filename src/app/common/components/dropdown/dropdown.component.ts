import { ListItem } from './../../models/list-item';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input()
  label: string;

  @Input()
  suffix: string;

  @Input()
  showLabel: boolean = true;

  @Input()
  options: ListItem[] = [];

  @Input()
  cancelText: string = $localize`:@@global.cancel: Cancel`;

  @Input()
  okText: string = $localize`:@@global.ok: Ok`;

  @Input()
  disabled: boolean;

  @Input()
  interface: 'action-sheet' | 'alert' | 'popover';

  @Input()
  interfaceOptions: any;

  @Input()
  multiple: boolean;

  @Input()
  placeholder: string;

  @Input()
  required: boolean;

  inputValue: ListItem;
  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  get value(): any {
    if (typeof this.inputValue === 'object' && this.inputValue !== null) {
      return this.inputValue.value;
    }
    return this.inputValue;
  }

  refreshValue() {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  writeValue(value: any) {
    this.inputValue = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  handleValueChange() {
    this.refreshValue();
  }
}
