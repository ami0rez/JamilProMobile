import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input()
  title

  @Input()
  image

  @Input()
  defaultImage

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
