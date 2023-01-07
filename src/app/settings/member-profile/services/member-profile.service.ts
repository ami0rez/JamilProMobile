import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { MemberProfileResponse } from '../models/member-profile-response';

@Injectable({
  providedIn: 'root'
})
export class MemberProfileService {
  readonly memberUrl =
  this.appConfigService.appConfig.apiUrl + 'api/v1/MemberProfile';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
  *  @description Ceates or updates member profile salon
  */
  public saveMemberProfile(query: MemberProfileResponse): Observable<MemberProfileResponse> {
    return this.http.put<MemberProfileResponse>(`${this.memberUrl}`, query);
  }

  /*
  *  @description get member profile salon
  */
  public getMemberProfile(): Observable<MemberProfileResponse> {
    return this.http.get<MemberProfileResponse>(`${this.memberUrl}`);
  }
}
