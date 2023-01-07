import { BankAccountItemResponse } from '../../models/bank-account-item-reponse';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bank-account-item',
  templateUrl: './bank-account-item.component.html',
  styleUrls: ['./bank-account-item.component.scss'],
})
export class BankAccountItemComponent implements OnInit {
  @Input()
  account: BankAccountItemResponse = new BankAccountItemResponse();
  @Input()
  showDefault = true;

  @Output()
  onChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  handleCheckClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleCheckChange() {
    this.onChange.emit();
  }
}
