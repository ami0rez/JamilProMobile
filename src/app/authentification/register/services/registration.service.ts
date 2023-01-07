import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesConstants } from 'src/app/common/constants/routes-constants';


import { UserRegisterSteps } from '../models/user-register-steps';
import { RegisterProcessEventsService } from './register-process-events.service';

@Injectable({
  providedIn: 'root',
})
/**
 *  @description Manage login page actions
 */
export class RegistrationService {
  constructor(
    private eventsService: RegisterProcessEventsService,
    private router: Router,
  ) {}

  /*
   *  @description Validate step and go next
   */
  register(step: number) {
    
  }
}
