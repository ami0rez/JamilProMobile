import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-popular-salons',
  templateUrl: './popular-salons.component.html',
  styleUrls: ['./popular-salons.component.scss'],
})
export class PopularSalonsComponent implements OnInit {

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
