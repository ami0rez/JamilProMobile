import { ListItem } from '../models/list-item';

export enum Roles {
  Owner,
  Administrator,
  Supervisor,
  Trainee,
  Member,
}

export const RolesOptions: ListItem[] = [
  {
    label: $localize`:@@global.roles.owner:Owner`,
    value: Roles.Owner,
  },
  {
    label: $localize`:@@global.roles.administrator:Administrator`,
    value: Roles.Administrator,
  },
  {
    label: $localize`:@@global.roles.supervisor:Supervisor`,
    value: Roles.Supervisor,
  },
  {
    label: $localize`:@@global.roles.trainee:Trainee`,
    value: Roles.Trainee,
  },
  {
    label: $localize`:@@global.roles.member:Member`,
    value: Roles.Member,
  },
];
