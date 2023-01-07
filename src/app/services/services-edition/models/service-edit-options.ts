import { SelectListItem } from 'src/app/common/models/select-liast-item';

/*
 *  @description Options that are used on editiong a service
 */
export class ServiceEditOptions {
  categories: SelectListItem[] = [];
  members: SelectListItem[] = [];
}
