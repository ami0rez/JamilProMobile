export class CreateMemberQuery {
  image: string;
  role: number;
  services: string[] = [];
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  hasAccess: boolean;
}
