import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/common/services/app-config-service';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly galleryUrl = this.appConfigService.appConfig.apiUrl + 'api/v1/Gallery';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  /*
   *  @description Get gallery images
   */
  public getGalleryImages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.galleryUrl}/Image`);
  }

  /*
   *  @description Get gallery images
   */
  public saveGalleryImage(query: any): Observable<void> {
    return this.http.post<void>(`${this.galleryUrl}/Image`, query);
  }

  /*
   *  @description Get gallery images
   */
  public saveGalleryVideo(query: any): Observable<void> {
    return this.http.post<void>(`${this.galleryUrl}/Video`, query);
  }
}
