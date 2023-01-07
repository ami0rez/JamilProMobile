import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalOptionsComponent } from 'src/app/common/components/modal-options/modal-options.component';
import { ModalOptionItem } from 'src/app/common/models/modal-option-item';

@Component({
  selector: 'app-setting-item',
  templateUrl: './setting-item.component.html',
  styleUrls: ['./setting-item.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SettingItemComponent),
      multi: true,
    },
  ],
})
export class SettingItemComponent implements ControlValueAccessor {
  @ViewChild(ModalOptionsComponent) modal: ModalOptionsComponent;
  @Input()
  title;

  @Input()
  useSwitch = false;

  @Input()
  useModal = false;

  @Input()
  single = true;

  @Input()
  options: ModalOptionItem[] = [];

  @Input()
  icon;

  @Input()
  description;

  @Input()
  route;

  value;

  @Output()
  onCheckboxChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onValueChanged: EventEmitter<any> = new EventEmitter<any>();

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private router: Router) {}
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  //Go to specefic page
  navigate() {
    if (this.useModal) {
      this.modal.openModal();
    } else if (this.route) {
      this.router.navigate([this.route]);
    }
  }

  handleCheckChange() {
    this.refreshValue();
    this.onCheckboxChange.emit();
  }

  handleCheckClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  refreshValue() {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  handleValueChanged() {
    this.refreshValue();
    this.onValueChanged.emit(this.value);
  }
}
