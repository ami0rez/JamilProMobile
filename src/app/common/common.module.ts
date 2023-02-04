import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckboxListComponent } from './components/checkbox-list/checkbox-list.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { LangSuppComponent } from './components/lang-supp/lang-supp.component';
import { ImageCardComponent } from './components/layouts/image-card/image-card.component';

import { LabeledDateComponent } from '../common/components/labeled-date/labeled-date.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ButtonComponent } from './components/controls/button/button.component';
import { FabComponent } from './components/controls/fab/fab.component';
import { FooterControlsComponent } from './components/controls/footer-controls/footer-controls.component';
import { PageControlsComponent } from './components/controls/page-controls/page-controls.component';
import { PageHeaderComponent } from './components/controls/page-header/page-header.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { PanelComponent } from './components/layouts/panel/panel.component';
import { SeparatorComponent } from './components/layouts/separator/separator.component';
import { TabComponent } from './components/layouts/tab/tab.component';
import { TabsComponent } from './components/layouts/tabs/tabs.component';
import { ModalOptionsComponent } from './components/modal-options/modal-options.component';
import { NumberInputComponent } from './components/number-input/number-input.component';
import { OutputValueComponent } from './components/output-value/output-value.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { OnlyEditForDirective } from './directives/only-owner-edit.directive';
import { OnlyDisplayForDirective } from './directives/only-diplay-for.directive';
import { ImageViewerComponent } from './components/layouts/image-viewer/image-viewer.component';
import { ImageComponent } from './components/image/image.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    LabeledDateComponent,
    ModalOptionsComponent,
    NumberInputComponent,
    DropdownComponent,
    CheckboxComponent,
    InputComponent,
    PageHeaderComponent,
    PageControlsComponent,
    ConfirmationComponent,
    ImageCardComponent,
    FabComponent,
    FooterControlsComponent,
    TabsComponent,
    TabComponent,
    OutputValueComponent,
    HeaderComponent,
    SeparatorComponent,
    PanelComponent,
    InputAddressComponent,
    TextareaComponent,
    ButtonComponent,
    LangSuppComponent,
    CheckboxListComponent,
    ModalMessageComponent,
    AvatarComponent,
    ImageViewerComponent,
    ImageComponent,

    OnlyEditForDirective,
    OnlyDisplayForDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    SwiperModule
  ],
  exports: [
    LabeledDateComponent,
    ModalOptionsComponent,
    NumberInputComponent,
    DropdownComponent,
    CheckboxComponent,
    InputComponent,
    PageHeaderComponent,
    PageControlsComponent,
    ConfirmationComponent,
    ImageCardComponent,
    FabComponent,
    FooterControlsComponent,
    TabsComponent,
    TabComponent,
    OutputValueComponent,
    HeaderComponent,
    SeparatorComponent,
    PanelComponent,
    InputAddressComponent,
    TextareaComponent,
    ButtonComponent,
    LangSuppComponent,
    CheckboxListComponent,
    ModalMessageComponent,
    AvatarComponent,
    ImageViewerComponent,
    ImageComponent,
    
    OnlyEditForDirective,
    OnlyDisplayForDirective
  ],
})
export class InvCommonModule {}
