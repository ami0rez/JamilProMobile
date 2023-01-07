import PaginationRequest from "src/app/common/models/pagination-request";
import { HomeData } from "./home-data";

export class DashboardPage{
  data: HomeData = new HomeData();
  request: PaginationRequest = new PaginationRequest();
}