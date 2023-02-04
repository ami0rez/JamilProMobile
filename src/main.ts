import { UserConfigUtils } from './app/common/utils/user-config-utils';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { loadTranslations } from '@angular/localize';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Locale } from './assets/i18n/local';
import { getTranslations } from './app/common/utils/i18n/local.core';
import { ParsedTranslationBundle } from './app/common/utils/i18n/parsed-translation-bundle';

if (environment.production) {
  enableProdMode();
}
UserConfigUtils.getUserConfig().then((conf) => {
  let language = conf.language;
  if (language == null) {
    language = 'fr';
  }
  getTranslations(`./assets/i18n/${language}.json`).then(
    (frData: ParsedTranslationBundle) => {
      loadTranslations(frData.translations);
      Locale.selectedLanguage = language;
      import('./app/app.module').then((module) => {
        platformBrowserDynamic()
          .bootstrapModule(module.AppModule)
          .catch((err) => alert(err));
      });
    }
  );
  return conf;
});
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));

defineCustomElements(window);
