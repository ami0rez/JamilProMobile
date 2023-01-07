import { CheckboxComponent } from './../checkbox/checkbox.component';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  QueryList,
} from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxListComponent),
      multi: true,
    },
  ],
})
export class CheckboxListComponent
  implements AfterContentInit, ControlValueAccessor
{
  @ContentChildren(CheckboxComponent) checkboxs: QueryList<CheckboxComponent>;
  selected: CheckboxComponent;
  selectedValue: string;
  @Input()
  label: string;

  @Input()
  extra: string;

  @Input()
  description: string;

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private notificationService: NotificationService) {}

  ngAfterContentInit() {
    this.checkboxs
      .toArray()
      .forEach((checkbox) =>
        checkbox.valueChanged.subscribe(() => this.checkboxChanged(checkbox))
      );
  }

  selectCheckbox(checkbox: CheckboxComponent) {
    this.checkboxs.toArray().forEach((checkbox) => checkbox.writeValue(false));
    checkbox.writeValue(true);
    this.selected = checkbox;
    this.refreshValue();
  }

  selectCheckboxByGroupValue(groupValue: string) {
    const checkbox = this.checkboxs?.toArray()
      .find((checkbox) => checkbox.groupValue == groupValue);
    if (checkbox) {
      this.selectCheckbox(checkbox);
    }
  }

  async checkboxChanged(checkbox: CheckboxComponent) {
    if (checkbox.value) {
      this.selectCheckbox(checkbox);
    } else {
      var checkboxcheked = this.checkboxs
        .toArray()
        .filter((checkbox) => checkbox.value);
      if (!checkboxcheked.length) {
        setTimeout(() => {
          checkbox.writeValue(true);
        }, 200);
        await this.notificationService.showError(
          $localize`:@@global.youMustSelectAnItem:You must select an item`
        );
      }
    }
  }

  get value(): string {
    return this.selected.groupValue ?? this.selected.id ?? this.selected.label;
  }

  refreshValue() {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  writeValue(value: string) {
    this.selectedValue = value;
    this.selectCheckboxByGroupValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
