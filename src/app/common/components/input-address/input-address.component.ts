import {
  Component,
  forwardRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonModal, Platform } from '@ionic/angular';

// import {
//   Environment,
//   GoogleMap,
//   GoogleMapOptions,
//   GoogleMaps,
//   GoogleMapsEvent,
//   Marker,
// } from '@ionic-native/google-maps/ngx';
import { Address } from '../../models/address';

@Component({
  selector: 'app-input-address',
  templateUrl: './input-address.component.html',
  styleUrls: ['./input-address.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAddressComponent),
      multi: true,
    },
  ],
})
export class InputAddressComponent implements ControlValueAccessor, OnInit {
  @ViewChildren(IonModal) modal: QueryList<IonModal>;

  @Input()
  label: string;

  @Input()
  id: string;

  @Input()
  showLabel: boolean = true;

  @Input()
  title: string = $localize`:@@global.select: Select`;

  @Input()
  isModalOpen = false;

  @Input()
  showModalData = true;

  address: Address = new Address();
  // map: GoogleMap;
  // environment: Environment = null;
  constructor(private plateform: Platform) {}

  async ngOnInit() {
    //await this.plateform.ready();
    //await this.loadMap();
  }
  onChange: any = () => {};
  onTouch: any = () => {};
  set value(val) {}
  get value(): any {
    return this.address;
  }

  refreshValue() {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  writeValue(value: any) {
    if (!value) {
      value = new Address();
    }
    this.address = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  cancel() {
    this.isModalOpen = false;
  }
  openModal() {
    this.isModalOpen = true;
  }

  handleAddressChange() {
    this.address.designation =
      (this.address.appt ?? '') +
      ' ' +
      (this.address.sector ?? '') +
      ' ' +
      (this.address.city ?? '') +
      ' ' +
      (this.address.region ?? '') +
      ' ' +
      (this.address.country ?? '');
    this.refreshValue();
  }
  onButtonClick(event) {}
  loadMap() {
    // // This code is necessary for browser
    // Environment.setEnv({
    //   API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyA_YtWWrg6uwCQI3NBE6_awVz9ADpLwul4',
    //   API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyA_YtWWrg6uwCQI3NBE6_awVz9ADpLwul4',
    // });
    // // Environment.setBackgroundColor('#ffffff55')
    // let mapOptions: GoogleMapOptions = {
    //   camera: {
    //     target: {
    //       lat: 43.0741904,
    //       lng: -89.3809802,
    //     },
    //     zoom: 18,
    //     tilt: 30,
    //   },
    // };

    // this.map = GoogleMaps.create('map_canvas', mapOptions);

    // let marker: Marker = this.map.addMarkerSync({
    //   title: 'Ionic',
    //   icon: 'blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 43.0741904,
    //     lng: -89.3809802,
    //   },
    // });
    // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //   alert('clicked');
    // });
  }
}
