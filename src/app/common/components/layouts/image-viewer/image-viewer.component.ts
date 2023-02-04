import { Component, ContentChildren, AfterContentInit, QueryList, ViewChild, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { ImageComponent } from '../../image/image.component';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements AfterContentInit {
  isModalOpen = false;
  @Input()
  images: string[];
  @ViewChild('swiper') swiper: SwiperComponent;

  constructor() { }

  ngAfterContentInit() {
  }

  slideChanged(){
    // this.slides.getActiveIndex().then(index => {
    //   if (index === 0) {
    //     this.slides.lockSwipeToPrev(true);
    //   } else {
    //     this.slides.lockSwipeToPrev(false);
    //   }
    //   if (index === this.images.length - 1) {
    //     this.slides.lockSwipeToNext(true);
    //   } else {
    //     this.slides.lockSwipeToNext(false);
    //   }
    // });
  }

  openPopup(image: any) {
    this.isModalOpen = true;
    // this.slides.slideTo(this.images.indexOf(image));
  }

  closePopup() {
    this.isModalOpen = false;
  }
}
