import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Camera } from '@capacitor/camera';
import {
  CameraResultType,
  CameraSource,
  ImageOptions,
} from '@capacitor/camera/dist/esm/definitions';

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

  onChange: any = () => {};
  onTouch: any = () => {};
  inputValue;
  displayedImage: string;

  options: ImageOptions = {
    quality: 100,
    source: CameraSource.Prompt,
    resultType: CameraResultType.Base64,
  };
  constructor(private notificationService: NotificationService) {}

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
    Camera.getPhoto(this.options).then(
      (imageData) => {
        this.displayedImage = 'data:image/jpeg;base64,' + imageData.base64String;
        this.value = imageData.base64String;
      },
      (err) => {
        this.notificationService.showError(err);
      }
    );
  }

  /*
   *  @description On image display error
   */
  onImageDisplayError() {
    this.displayedImage = this.defaultAvatar;
  }
}
