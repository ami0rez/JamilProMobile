import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Roles } from '../enums/roles';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[onlyDisplayFor]'
})
export class OnlyDisplayForDirective implements OnInit {
  @Input() onlyDisplayFor: Roles[];

  constructor(private el: ElementRef, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    const userRole = this.authenticationService.userProfile?.role;
    if (!this.onlyDisplayFor.includes(userRole)) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
