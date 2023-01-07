import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-item',
  templateUrl: './setting-item.component.html',
  styleUrls: ['./setting-item.component.scss'],
})
export class SettingItemComponent implements OnInit {
  @Input()
  title

  @Input()
  icon

  @Input()
  description

  @Input()
  route
  
  constructor(private router: Router) { }

  ngOnInit() {}

  //Go to specefic page
  navigate(){
    if(this.route){
      this.router.navigate([this.route])
    }
  }
}
