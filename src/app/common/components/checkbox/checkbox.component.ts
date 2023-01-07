import { ListItem } from './../../models/list-item';
import {
  Component,
  forwardRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input()
  id: string = 'start';

  @Input()
  lot: string = 'start';

  @Input()
  useToggle = true;

  @Input()
  label: string;

  @Input()
  showLabel: boolean = true;

  @Input()
  checked: boolean;

  @Input()
  groupValue: string;

  @Input()
  color:
    | 'danger'
    | 'dark'
    | 'light'
    | 'medium'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'tertiary'
    | 'warning'
    | (string & Record<never, never>)
    | undefined;

  @Input()
  disabled: boolean;

  @Input()
  indeterminate: boolean;

  @Input()
  enableOnOffLabels: boolean;

  @Output()
  valueChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  inputValue: ListItem;
  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  get value(): any {
    return this.inputValue;
  }

  refreshValue() {
    this.onChange(this.value);
    this.onTouch(this.value);
    this.valueChanged.emit(this.value);
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
