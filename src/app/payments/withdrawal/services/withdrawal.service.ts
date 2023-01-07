import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { BankAccountItemResponse } from 'src/app/settings/bank-account/models/bank-account-item-reponse';

@Injectable({
  providedIn: 'root',
})
export class WithdrawalService {
  readonly bankAccountUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/BankAccount';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get bank account by id
   */
  public getDefaultBankAccount(): Observable<BankAccountItemResponse> {
    return this.http.get<BankAccountItemResponse>(
      `${this.bankAccountUrl}/Default`
    );
  }
}
