import { PageBase } from 'src/app/common/models/page-base';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ListItem } from 'src/app/common/models/list-item';
import { ServicesCategory } from '../../models/serivce-list-category';
import { ServicesListItem } from '../../models/service-list-item';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss'],
})
export class ServiceItemComponent extends PageBase implements OnInit {
  @Input()
  item: ServicesCategory;

  @Input()
  serviceTypes: ListItem[];

  @Output()
  onEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCreateService: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onEditService: EventEmitter<ServicesListItem> =
    new EventEmitter<ServicesListItem>();

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter<any>();

  showRows = false;
  isOpen = false;
  constructor(private router: Router) {
    super();
  }

  ngOnInit() {}

  toggleRows() {
    this.showRows = !this.showRows;
  }

  createService() {
    this.onCreateService.emit();
  }

  editService(service: ServicesListItem) {
    this.onEditService.emit(service);
  }

  cancel() {
    this.isOpen = false;
  }

  save() {}

  editCategory() {
    this.onEdit.emit();
  }

  deleteCategory() {
    this.onDelete.emit();
  }
}
