import { DefaultConstants } from '../../constants/default-constants';
import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-labeled-date',
  templateUrl: './labeled-date.component.html',
  styleUrls: ['./labeled-date.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => LabeledDateComponent), multi: true }],
})
export class LabeledDateComponent implements ControlValueAccessor, OnChanges {

  @ViewChild('popover') popover;

  isOpen = false;
  @Input() id: string;
  @Input() disabled = false;
  @Input() modeEdition = true;
  @Input() yearNavigator = true;
  @Input() yearRange = '2000:2030';
  @Input() monthNavigator = true;
  labelDateFormat = 'dd/MM/yyyy';
  @Input() presentation = 'date';
  @Input() showSeconds;
  @Input() hourFormat;
  @Input() showIcon = true;
  @Input() showButtonBar = true;
  @Input() label = 'Pick A date';
  @Input() dynamicLabel = '';
  @Input() errorMessage = $localize`:@@global.errorRequired: Field required `;
  @Input() required;
  @Input() appendTo: string;
  @Input() showTime = false;
  @Input() useUtc = true;

  @Output() dateSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() dateInput: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() showLabel = true;
  @Input() nullValues: any[] = [];
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() firstDayOfWeek = 1;
  isNullValue = undefined;
  calendarValue: any = new Date();
  fieldVisible = true;
  @Input() set visible(value: boolean) {
    this.fieldVisible = value;
  }
  get visible(): boolean {
    return this.fieldVisible;
  }

  constructor() { }
  ngOnChanges(): void {
    if (this.presentation == 'time') {
      this.labelDateFormat = DefaultConstants.timePattern24;
    } else {
      this.labelDateFormat = DefaultConstants.datePattern;
    }
  }
  get componentId() {
    return 'label-calendar-' + this.id ?? 'id';
  }
  onChange: any = () => { };
  onTouch: any = () => { };

  presentPopover(e: Event) {
    if (!this.disabled) {
      this.popover.event = e;
      this.isOpen = true;
    }
  }

  set value(val) {
    this.updateNullState(val);
    if (val !== undefined && val !== null) {
      if (this.useUtc === true) {
        this.calendarValue = val;
        // this.calendarValue = DateUtils.toUtcDateFormat(val);
      } else {
        this.calendarValue = val;
      }
      this.onChange(this.calendarValue);
      this.onTouch(this.calendarValue);
      this.valueChange.emit(val);
    } else {
      this.onChange(undefined);
      this.calendarValue = undefined;
    }
  }
  get value(): any {
    return this.calendarValue;
  }

  private updateNullState(val) {
    if (this.nullValues) {
      this.isNullValue = this.nullValues.includes(val);
    } else {
      this.isNullValue = false;
    }
  }

  writeValue(value: any) {
    this.updateNullState(value);
    this.calendarValue = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  onDateSelect(event) {
    this.dateSelect.emit(event);
  }

  onDateInput(event) {
    this.dateInput.emit(event);
  }

  onClearClick() {
    this.clearClick.emit();
  }

  selectDate(){
    this.calendarValue =this.calendarValue ?? new Date();
    this.cancel()
  }
  cancel(){
    this.isOpen = false;
  }

}
