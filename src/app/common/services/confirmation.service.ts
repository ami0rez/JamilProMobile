import { ConfirmationModel } from './../models/confirmation-model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  onDisplay: Subject<any> = new Subject<any>();
  constructor() { }

  confirm(confirmation: ConfirmationModel){
    this.onDisplay.next(confirmation);
  }

}
