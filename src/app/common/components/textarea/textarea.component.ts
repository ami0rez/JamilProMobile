import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input()
  label: string;

  @Input()
  showLabel: boolean = true;

  @Input()
  autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';

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
  maxlength: number;

  @Input()
  minlength: number;

  @Input()
  placeholder: string;

  @Input()
  readonly: boolean;

  @Input()
  required: boolean;

  @Input()
  autoGrow: boolean;

  inputValue: number;
  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val) {
    this.inputValue = val;
    this.refreshValue();
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
