import { ServiceTreatmentTypeResponse } from "./service-treatment-type-response";

export class NewCategoryData {
  id: string;
  name: string;
  description: string;
  treatmentList: ServiceTreatmentTypeResponse[] = [];
}