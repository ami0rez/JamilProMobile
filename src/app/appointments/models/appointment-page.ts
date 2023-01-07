import PaginationRequest from "src/app/common/models/pagination-request";
import { AppointmentsData} from "./appointment-data";

export class AppointmentPage {
  data: AppointmentsData = new AppointmentsData();
  request: PaginationRequest = new PaginationRequest();
}
