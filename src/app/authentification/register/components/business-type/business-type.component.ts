import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SalonTypeResponse } from '../../models/salon-type-response';

@Component({
  selector: 'app-business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessTypeComponent),
      multi: true,
    },
  ],
})
export class BusinessTypeComponent implements ControlValueAccessor {
  @Input()
  types: SalonTypeResponse[] = [];

  @Input()
  maxSelected = 3;

  @Input()
  single: boolean;

  selctedCount = 0;
  selectedTypes: string[] = [];
  constructor() {}

  onChange: any = () => {};
  onTouch: any = () => {};

  refreshValue() {
    var value = undefined;
    if (this.single && this.selectedTypes.length) {
      value = this.selectedTypes[0];
    } else {
      value = this.selectedTypes;
    }
    this.onChange(value);
    this.onTouch(value);
  }

  writeValue(value: any) {
    this.selectedTypes = value;
    this.refreshSelected();
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  /*
   *  @description select
   */
  select(type: SalonTypeResponse) {
    if (this.selctedCount < this.maxSelected || type.selected) {
      type.selected = !type.selected;
      if (type.selected) {
        this.selectedTypes = [...(this.selectedTypes || []), type.id];
      } else {
        this.selectedTypes = this.selectedTypes.filter(
          (selectedType) => selectedType != type.id
        );
      }
      this.selctedCount = this.selectedTypes.length;
      this.refreshValue();
    }
  }
  /*
   *  @description Refresh selected
   */
  refreshSelected() {
    if(typeof this.selectedTypes == 'string'){
      this.selectedTypes = [this.selectedTypes]
    }
    this.selectedTypes?.forEach((selectedType) => {
      var type = this.types.find((type) => type.id == selectedType);
      if (type) {
        type.selected = true;
      }
    });
  }
}
