import { PageBase } from 'src/app/common/models/page-base';
import { GalleryPage } from './../../models/gallery-page';
import { Component, OnInit } from '@angular/core';
import { GalleryManagerService } from '../../services/gallery-manager.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent extends PageBase implements OnInit {
  pageObject: GalleryPage = new GalleryPage();
  constructor(private galleryManagerService: GalleryManagerService) {
    super();
  }

  async ngOnInit() {
    this.galleryManagerService.initGalleryControls(this.pageObject);
    await this.galleryManagerService.loadImages(this.pageObject);
  }
}
