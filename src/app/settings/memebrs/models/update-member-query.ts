export class UpdateMemberQuery {
  id: string;
  image: string;
  role: number;
  services: string[] = [];
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  hasAccess: boolean;
}
