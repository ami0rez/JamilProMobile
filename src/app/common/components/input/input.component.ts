import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input()
  label: string;

  @Input()
  suffix: string;

  @Input()
  showLabel: boolean = true;

  @Input()
  autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

  @Input()
  clearInput: boolean;

  @Input()
  type: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' =
    'text';

  @Input()
  inputmode:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | undefined;

  @Input()
  max: number;

  @Input()
  maxlength: number;

  @Input()
  min: number;

  @Input()
  minlength: number;

  @Input()
  placeholder: string;

  @Input()
  readonly: boolean;

  @Input()
  required: boolean;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  inputValue: number;
  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val) {
    this.inputValue = val;
    this.refreshValue();
    this.change.emit(val);
  }

  get value(): any {
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
}
