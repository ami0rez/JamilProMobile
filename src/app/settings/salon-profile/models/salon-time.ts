import { Days } from "src/app/common/enums/days";

export class SalonTimeDto {
  monday: SalonTimeItemDto = new SalonTimeItemDto(Days.Monday);
  tuesday: SalonTimeItemDto = new SalonTimeItemDto(Days.Tuesday);
  wednesday: SalonTimeItemDto = new SalonTimeItemDto(Days.Wednesday);
  thursday: SalonTimeItemDto = new SalonTimeItemDto(Days.Thursday);
  friday: SalonTimeItemDto = new SalonTimeItemDto(Days.Friday);
  saturday: SalonTimeItemDto = new SalonTimeItemDto(Days.Saturday);
  sunday: SalonTimeItemDto = new SalonTimeItemDto(Days.Sunday);
}

export class SalonTimeItemDto {
  constructor(day) {
    this.day = day;    
  }
  active: boolean
  day: Days;
  startTime: Date;
  endTime: Date;
}