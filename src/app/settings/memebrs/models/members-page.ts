import { MombersData } from './mombers-data';
import { ModalOptionItem } from './../../../common/models/modal-option-item';
import { MenuItem } from './../../../common/models/menu-item';
import { RolesOptions } from 'src/app/common/enums/roles';

export class MembersPage {
  data: MombersData = new MombersData();
  controls: MenuItem[] = [];
  editPageTitle = $localize`:@@team.memeber:Member`;
  serviceOptions: ModalOptionItem[] = [];
  rolesOptions = RolesOptions;
  defaultAvatar = 'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-businessman-user-avatar-free-vector-png-image_1538405.jpg'
  base64Image: string;
}
