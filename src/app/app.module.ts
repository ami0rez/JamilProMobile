import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvCommonModule } from './common/common.module';
import { CustomHttpInterceptor } from './common/services/custom-http-interceptor.service';
import { AppConfigService } from './common/services/app-config-service';
import { AuthComponentComponent } from './authentification/components/auth-component/auth-component.component';

@NgModule({
  declarations: [AppComponent, AuthComponentComponent],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    InvCommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    CommonModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
