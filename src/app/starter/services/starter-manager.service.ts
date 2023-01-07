import { RoutesConstants } from './../../common/constants/routes-constants';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperComponent } from 'swiper/angular';
import { StarterPage } from './../models/starter-page';
import { StarterService } from './starter.service';

@Injectable({
  providedIn: 'root',
})
export class StarterManagerService {
  constructor(private starterService: StarterService, private router: Router) {}

  /*
   *  @description Get notifications
   */
  async getStories(pageObject: StarterPage, language: string) {
    const stories = await this.starterService.getStories(language).toPromise();
    pageObject.data = stories;
    pageObject.initialstoryDuration = stories.storyDuration;
  }

  /*
   *  @description Start story loop
   */
  startStoryLoop(pageObject: StarterPage, swiper: SwiperComponent) {
    setTimeout(() => {
      pageObject.storyIndex = 1;
    }, 100);
    setTimeout(() => {
      swiper.swiperRef.slideTo(1, pageObject.data.storySlidingDuration * 1000);
    }, pageObject.data.storyDuration * 1000);
  }

  /*
   *  @description Init story counters
   */
  initStoryCounters(pageObject: StarterPage, swiper: SwiperComponent) {
    this.clearStoryTimeouts(pageObject);
    setTimeout(() => {
      pageObject.data.storyDuration = 0;
      pageObject.storyIndex = 0;
      setTimeout(() => {
        pageObject.data.storyDuration = pageObject.initialstoryDuration;
        this.startStoryLoop(pageObject, swiper);
      }, 100);
    }, pageObject.data.storiesRepeatDelay * 1000);
  }

  /*
   *  @description Clear story timeouts
   */
  clearStoryTimeouts(pageObject: StarterPage) {
    pageObject.storyTimeouts.forEach((value) => {
      clearTimeout(value);
    });
  }

  /*
   *  @description Refresh stories
   */
  refreshStories(pageObject: StarterPage, swiper: SwiperComponent, event) {
    console.log(event[0].activeIndex);

    this.clearStoryTimeouts(pageObject);
    pageObject.data.storyDuration = 0;
    pageObject.storyIndex = event[0].activeIndex;
    console.log('storyIndex: ', pageObject.storyIndex);
    const timeout = setTimeout(() => {
      pageObject.data.storyDuration = pageObject.initialstoryDuration;
      pageObject.storyIndex = event[0].activeIndex + 1;
      const timeout2 = setTimeout(() => {
        if (pageObject.storyIndex + 1 > pageObject.data.items.length) {
          swiper.swiperRef.slideTo(
            0,
            pageObject.data.storySlidingDuration * 1000
          );
        } else {
          swiper.swiperRef.slideTo(
            pageObject.storyIndex,
            pageObject.data.storySlidingDuration * 1000
          );
        }
      }, pageObject.data.storyDuration * 1000);
      pageObject.storyTimeouts.push(timeout2);
    }, 100);
    pageObject.storyTimeouts.push(timeout);
  }

  /*
   *  @description Redirect to loging
   */
  redirectToLoging() {
    this.router.navigate([RoutesConstants.home]);
  }
}
