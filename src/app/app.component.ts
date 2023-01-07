import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  async ngOnInit() {
    await this.authenticationService.loadAuthenticationSettings();
    await this.authenticationService.loadUserProfile();
  }
}
