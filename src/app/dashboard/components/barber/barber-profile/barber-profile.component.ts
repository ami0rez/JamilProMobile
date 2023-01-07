import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileAdvanceResponse } from 'src/app/dashboard/models/profile-advance';

@Component({
  selector: 'app-barber-profile',
  templateUrl: './barber-profile.component.html',
  styleUrls: ['./barber-profile.component.scss'],
})
export class BarberProfileComponent implements OnInit {

  @Input()
  advance: ProfileAdvanceResponse = new ProfileAdvanceResponse();

  @Output()
  completeProfile: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {}

  /*
  *  @description on complete profile clicked
  */
  handleCompleteProfile(){
    this.completeProfile.next(null);
  }

}
