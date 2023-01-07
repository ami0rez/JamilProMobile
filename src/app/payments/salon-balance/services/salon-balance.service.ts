import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import PaginationRequest from 'src/app/common/models/pagination-request';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { PaymentDetails } from '../models/payment-details';
import { PaymentListItem } from '../models/payment-list-item';
import { EarningsResponse } from '../models/payment-response';

@Injectable({
  providedIn: 'root',
})
export class SalonBalanceService {
  readonly paymentUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Payment';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get notifications
   */
  public getPayments(
    request: PaginationRequest
  ): Observable<PaymentListItem[]> {
    return this.http.post<PaymentListItem[]>(`${this.paymentUrl}`, request);
  }

  /*
   *  @description Get notifications
   */
  public getEarnings(): Observable<EarningsResponse> {
    return this.http.get<EarningsResponse>(`${this.paymentUrl}/Earning`);
  }

  /*
   *  @description Get notifications
   */
  public getPaymentById(id: string): Observable<PaymentDetails> {
    return this.http.get<PaymentDetails>(`${this.paymentUrl}/${id}`);
  }
}
