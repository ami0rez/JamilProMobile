import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RefreshTokenQuery } from 'src/app/common/models/refresh-token-query';
import { RefreshTokenResponse } from 'src/app/common/models/refresh-token-response';
import { AppConfigService } from 'src/app/common/services/app-config-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Token';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  public refresh(query: RefreshTokenQuery): Observable<RefreshTokenResponse> {
    return this.http.post<RefreshTokenResponse>(
      `${this.tokenUrl}/Refresh`,
      query
    );
  }
}
