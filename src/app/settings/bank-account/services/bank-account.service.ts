import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { BankAccountItemResponse } from '../models/bank-account-item-reponse';
import { CreateBankAccountQuery } from '../models/create-bank-account-query';
import { UpdateBankAccountQuery } from '../models/update-bank-account-query';

@Injectable({
  providedIn: 'root',
})
export class BakAccountService {
  readonly bankAccountUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/BankAccount';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get bank accounts
   */
  public getBankAccounts(): Observable<BankAccountItemResponse[]> {
    return this.http.get<BankAccountItemResponse[]>(`${this.bankAccountUrl}`);
  }

  /*
   *  @description Get bank account by id
   */
  public getBankAccountById(id: string): Observable<BankAccountItemResponse> {
    return this.http.get<BankAccountItemResponse>(
      `${this.bankAccountUrl}/${id}`
    );
  }

  /*
   *  @description Create bank account
   */
  public createBankAccount(
    query: CreateBankAccountQuery
  ): Observable<BankAccountItemResponse> {
    return this.http.post<BankAccountItemResponse>(
      `${this.bankAccountUrl}`,
      query
    );
  }

  /*
   *  @description Update bank account
   */
  public updateBankAccount(
    id: string,
    query: UpdateBankAccountQuery
  ): Observable<BankAccountItemResponse> {
    return this.http.put<BankAccountItemResponse>(
      `${this.bankAccountUrl}/${id}`,
      query
    );
  }

  /*
   *  @description delete bank account
   */
  public deleteBankAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.bankAccountUrl}/${id}`);
  }

  /*
   *  @description delete bank account
   */
  public setAsDefault(id: string): Observable<void> {
    return this.http.get<void>(`${this.bankAccountUrl}/Default/${id}`);
  }
}
