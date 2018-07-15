import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import CircleType from 'circletype';

@Component({
  selector: 'app-bakery-logo',
  templateUrl: './bakery-logo.component.html',
  styleUrls: ['./bakery-logo.component.css']
})
export class BakeryLogoComponent implements OnInit {

  @ViewChild('logo') div: ElementRef;
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(() => {

      const circleType = new CircleType(this.div.nativeElement);
      circleType.radius(40).dir(1);

    }, 0)
  }

}
