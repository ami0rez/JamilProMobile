import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-upcoming-appointments',
  templateUrl: './upcoming-appointments.component.html',
  styleUrls: ['./upcoming-appointments.component.scss'],
})
export class UpcomingAppointmentsComponent implements OnInit {
  @ViewChild('slider', { static: true }) private slider: IonSlides;
  public slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor() { }

  ngOnInit() { }

  public async ionSlideDidChange(): Promise<void> {
    const index = await this.slider.getActiveIndex();

  }
}
