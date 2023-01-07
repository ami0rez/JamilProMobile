import { Directive, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Roles } from '../enums/roles';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[onlyEditFor]'
})
export class OnlyEditForDirective implements OnInit {
  @Input() onlyEditFor: Roles[];
  @ViewChildren('*') children: QueryList<ElementRef>;

  constructor(private el: ElementRef, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    const userRole = this.authenticationService.userProfile?.role;
    if (this.onlyEditFor && !this.onlyEditFor?.includes(userRole)) {
      this.disableClicksAndEditing(this.el);
      this.children?.forEach(child => {
        this.disableClicksAndEditing(child);
      });
    }
  }

  disableClicksAndEditing(element: ElementRef) {
    element.nativeElement.style.pointerEvents = 'none';
    if (element.nativeElement.tagName === 'INPUT' || element.nativeElement.hasOwnProperty('disabled')) {
      element.nativeElement.disabled = true;
    }
  }
}

