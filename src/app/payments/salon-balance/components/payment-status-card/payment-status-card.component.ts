import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-status-card',
  templateUrl: './payment-status-card.component.html',
  styleUrls: ['./payment-status-card.component.scss'],
})
export class PaymentStatusCardComponent implements OnInit {
  @Input()
  paid: boolean = true;

  @Input()
  byCart: boolean = true;
  constructor() {}

  ngOnInit() {}
}
