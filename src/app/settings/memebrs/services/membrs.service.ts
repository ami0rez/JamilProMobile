import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';
import { CreateMemberQuery } from '../models/create-member-query';
import { MemberItemResponse } from '../models/member-item-reposne';
import { UpdateMemberQuery } from '../models/update-member-query';

@Injectable({
  providedIn: 'root'
})
export class MembrsService {
  readonly memberUrl =
    this.appConfigService.appConfig.apiUrl + 'api/v1/Member';
  
    constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get members
   */
  public getMembers(): Observable<MemberItemResponse[]> {
    return this.http.get<MemberItemResponse[]>(`${this.memberUrl}`);
  }

  /*
   *  @description Get member by id
   */
  public getMemberById(id: string): Observable<MemberItemResponse> {
    return this.http.get<MemberItemResponse>(`${this.memberUrl}/${id}`);
  }

  /*
   *  @description Create member
   */
  public createMember(
    query: CreateMemberQuery
  ): Observable<MemberItemResponse> {
    return this.http.post<MemberItemResponse>(`${this.memberUrl}`, query);
  }

  /*
   *  @description Update member
   */
  public updateMember(
    id: string,
    query: UpdateMemberQuery
  ): Observable<MemberItemResponse> {
    return this.http.put<MemberItemResponse>(`${this.memberUrl}/${id}`, query);
  }

  /*
   *  @description delete member
   */
  public removeMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.memberUrl}/${id}`);
  }
}
