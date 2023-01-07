import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  EventEmitter,
  Output,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
  selectedTabIndex = 0;

  @Input()
  tabIndex: number;

  @Output()
  tabIndexChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  tabChanged: EventEmitter<number> = new EventEmitter<number>();
  i: number;
  constructor() {}

  ngOnInit() {}

  selectTab(tab: TabComponent, index: number) {
    // deactivate all tabs
    this.tabs.toArray().forEach((tab) => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
    this.tabIndex = this.tabs.toArray().indexOf(tab);
    this.tabIndexChange.emit(this.tabIndex);
    this.tabChanged.emit(this.tabIndex);
  }

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first, 0);
    }
  }
}
