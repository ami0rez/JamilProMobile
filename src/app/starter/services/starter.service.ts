import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from 'src/app/common/services/app-config-service';
import { StarterData } from '../models/starter-data';

@Injectable({
  providedIn: 'root',
})
export class StarterService {
  readonly starterStoryUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/StarterStory';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get notifications
   */
  public getStories(language: string): Observable<StarterData> {
    return this.http.get<StarterData>(`${this.starterStoryUrl}/${language}`);
  }
}
