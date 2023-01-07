import { Address } from "src/app/common/models/address";
import {  SalonTimeItemDto } from "./salon-time";

export class SalonProfileDto {
  id?: string;
  image?: string;
  name?: string;
  leagalName?: string;
  address?: Address;
  phoneNumber?: string;
  email?: string;
  salonGender?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  salonTime?: SalonTimeItemDto[] = [];
}