import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-best-deals',
  templateUrl: './best-deals.component.html',
  styleUrls: ['./best-deals.component.scss'],
})
export class BestDealsComponent implements OnInit {

  @ViewChild('slider', { static: true }) private slider: IonSlides;
  public slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() { }

  ngOnInit() {}

  public async ionSlideDidChange(): Promise<void> {
    const index = await this.slider.getActiveIndex();

  }
}
