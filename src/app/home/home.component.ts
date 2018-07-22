import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SpinnerService } from '../service-spinner/spinner-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(public sp: SpinnerService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    window.scroll(0,0);
  }

}
