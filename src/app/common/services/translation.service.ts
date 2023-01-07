import { TreatmentConstants } from './../constants/treatments-constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  field = $localize`:@@global.theField:The field`;
  isRequired = $localize`:@@global.isRequired:is required`;
  constructor() {}

  generateRequiredMessage(fieldName: string) {
    if (!fieldName) {
      return $localize`:@@global.fillRequiredFields:Fill required fields`;
    }
    var sentenceFieldName =
      fieldName[0].toLocaleLowerCase() +
      (fieldName.length > 1 ? fieldName.substring(1) : '');
    return `${this.field} "${sentenceFieldName}" ${this.isRequired}`;
  }

  translateTreatments(fieldName: string): string {
    if (!fieldName) {
      return '';
    }
    var translatedText = TreatmentConstants[fieldName];
    if (!translatedText) {
      const result = fieldName.split(/(?=[A-Z])/);
      translatedText =
        result[0][0].toUpperCase() +
        (result[0][0].length > 1 ? result[0].substring(1) : '');
      if (result.length > 1) {
        for (let index = 0; index < result.length; index++) {
          const element = result[index];
          translatedText = translatedText + ' ' + element;
        }
      }
    }
    return translatedText;
  }

  /*
  *  @description Translate with variable
  */
  translateWithVariable(text: string, variable: any): string {
    if (!text) {
      return '';
    }
    return text.replace(/{(\d+)}/g, (match, num) => {
      return variable;
    });
  }
}
