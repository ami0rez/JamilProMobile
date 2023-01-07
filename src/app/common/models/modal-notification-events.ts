import { Subject } from "rxjs";
import { ModalNotification } from "./modal-notification";

export class ModalNotificationEvents {
  public static modaleNotificationStateChange: Subject<boolean> =
    new Subject<boolean>();
  public static modaleNotificationDataChange: Subject<ModalNotification> =
    new Subject<ModalNotification>();
}
