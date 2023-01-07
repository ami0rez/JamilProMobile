import {
  Component,
  EventEmitter,
  forwardRef,
  Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

//import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { NotificationService } from 'src/app/common/services/notification.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AvatarComponent),
      multi: true,
    },
  ],
})
export class AvatarComponent implements ControlValueAccessor {
  @Input()
  editable: boolean;

  @Input()
  defaultAvatar: string;

  @Output()
  change: EventEmitter<any> = new EventEmitter<any>();

  //options: CameraOptions;
  onChange: any = () => {};
  onTouch: any = () => {};
  inputValue;
  displayedImage: string;
  constructor(
    //private camera: Camera,
    private notificationService: NotificationService
  ) {
    // this.options = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   saveToPhotoAlbum: false,
    // };
  }

  set value(val) {
    this.inputValue = val;
    this.refreshValue();
    this.change.emit(val);
  }

  get value(): any {
    return this.inputValue;
  }

  refreshValue() {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  writeValue(value: any) {
    this.displayedImage = value ?? this.displayedImage;
    this.inputValue = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  /*
   *  @description Pick image
   */
  pickImage() {
    // this.camera.getPicture(this.options).then(
    //   (imageData) => {
    //     this.displayedImage = 'data:image/jpeg;base64,' + imageData;
    //     this.value = imageData;
    //   },
    //   (err) => {
    //     this.notificationService.showError(err);
    //   }
    // );
  }

  /*
   *  @description On image display error
   */
  onImageDisplayError() {
    this.displayedImage = this.defaultAvatar;
  }
}
