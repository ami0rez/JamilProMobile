import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { ParsedTranslationBundle } from "./parsed-translation-bundle";

export const getTranslations = async (path): Promise<ParsedTranslationBundle> => {

  const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
  var result = await httpClient.get<ParsedTranslationBundle>(path).toPromise();
  return result;
}