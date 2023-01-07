import { MenuItem } from 'src/app/common/models/menu-item';
import { GalleryData } from './gallery-data';
// import { CameraOptions } from '@awesome-cordova-plugins/camera/ngx';


export class GalleryPage {
  data: GalleryData = new GalleryData();
  controls: MenuItem[] = [];
  // photoOptions: CameraOptions;
  // videoOptions: CameraOptions;
}
