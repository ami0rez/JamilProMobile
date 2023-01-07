import { ServicesListItem } from "./service-list-item";

export class ServicesCategory{
  id: string;
  name: string;
  services: ServicesListItem[] = [];
}