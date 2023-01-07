import { ListItem } from 'src/app/common/models/list-item';
export enum AppointemntStates{
  New,
  Refused,
  Accepted,
  Cancelled,
  Completed
}


export const AppointemntStatesOptions: ListItem[] = [
  {
    label: $localize`:@@appointment-states.new:New`,
    value: AppointemntStates.New
  },
  {
    label: $localize`:@@appointment-states.refused:Refused`,
    value: AppointemntStates.Refused
  },
  {
    label: $localize`:@@appointment-states.accepted:Accepted`,
    value: AppointemntStates.Accepted
  },
  {
    label: $localize`:@@appointment-states.cancelled:Cancelled`,
    value: AppointemntStates.Cancelled
  },
  {
    label: $localize`:@@appointment-states.completed:Completed`,
    value: AppointemntStates.Completed
  }
]