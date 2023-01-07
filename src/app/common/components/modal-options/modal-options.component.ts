import { SelectListItem } from './../../models/select-liast-item';
import {
  Component,
  forwardRef,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  QueryList,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { ListItem } from '../../models/list-item';
import { ModalOptionItem } from '../../models/modal-option-item';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  styleUrls: ['./modal-options.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModalOptionsComponent),
      multi: true,
    },
  ],
})
export class ModalOptionsComponent implements ControlValueAccessor, OnChanges {
  @ViewChildren(IonModal) modal: QueryList<IonModal>;

  @Input()
  label: string;

  @Input()
  id: string;

  @Input()
  suffix: string;

  @Input()
  showLabel: boolean = true;

  @Input()
  title: string = $localize`:@@global.select: Select`;

  @Input()
  options: ModalOptionItem[] | ListItem[] | SelectListItem[] = [];

  @Input()
  maxItems = 2;

  @Input()
  single = false;

  @Input()
  showListHeaders = true;

  @Input()
  isModalOpen = false;

  @Input()
  showModalData = true;

  @Output()
  onValueChanged: EventEmitter<any> = new EventEmitter<any>();

  /*
   *  @description used to format options for model (options need to be formatted if ListItem[])
   */
  formattedOptions: ModalOptionItem[] = [];
  disableCheckBoxes = false;
  selectedItems: ListItem[] = [];
  rawValue: string;
  optionsKey = 'options';
  isValueChanged = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (Object.keys(changes).includes(this.optionsKey)) {
      if (changes[this.optionsKey].currentValue?.length > 0) {
        if (
          !changes[this.optionsKey].currentValue[0].id &&
          changes[this.optionsKey].currentValue[0].id != 0
        ) {
          this.showListHeaders = false;
          this.maxItems = 1;
          this.formattedOptions = [
            {
              id: '0',
              name: '',
              options: changes[this.optionsKey].currentValue,
            },
          ];
        } else {
          this.formattedOptions = changes[this.optionsKey].currentValue;
        }
      }
      this.selectOptions(this.rawValue);
    }
  }
  onChange: any = () => {};
  onTouch: any = () => {};
  set value(val) {
    this.selectOptions(val);
  }
  get value(): any {
    if (this.maxItems == 1) {
      return this.selectedItems[0]?.value;
    } else {
      return this.selectedItems.map((item) => item.value);
    }
  }

  refreshValue() {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  refreshDisabledState() {
    const count = this.countSelectedOptions();
    this.disableCheckBoxes = count >= this.maxItems;
  }

  writeValue(value: any) {
    this.rawValue = value;
    this.selectOptions(value);
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  cancel() {
    if (this.isValueChanged) {
      this.onValueChanged.emit();
    }
    this.isModalOpen = false;
  }
  openModal() {
    this.isModalOpen = true;
  }

  checkBoxChnage(item: SelectListItem) {
    this.isValueChanged = true;
    if (this.single && item.selected) {
      this.unselectAll();
      item.selected = true;
      this.formattedOptions = [...this.formattedOptions];
    }
    this.selectedItems = this.getSelectedItems();
    if (!this.single) {
      this.refreshDisabledState();
    }
    this.refreshValue();
  }

  unselectAll() {
    this.formattedOptions?.forEach((type) => {
      type?.options?.forEach((option) => {
        option.selected = false;
      });
    });
  }

  getSelectedItems(): ListItem[] {
    var items = [];
    this.formattedOptions?.forEach((types) => {
      items = [...items, ...types.options.filter((item) => item.selected)];
    });
    return items;
  }
  countSelectedOptions() {
    var count = 0;
    this.formattedOptions?.forEach((types) => {
      count += types.options.filter((item) => item.selected)?.length ?? 0;
    });
    return count;
  }
  selectOptions(...args) {
    if (Array.isArray(args)) {
      if (Array.isArray(args[0])) {
        args = [].concat.apply([], args);
      }
    }
    this.formattedOptions?.forEach((types) => {
      types.options.forEach((item) => {
        if (args.some((opt) => opt == item.value)) {
          item.selected = true;
          if (!this.selectedItems.includes(item)) {
            this.selectedItems.push(item);
          }
        }
      });
    });
    if (!this.single) {
      this.refreshDisabledState();
    }
  }
}
