import { Component } from '@angular/core';
import { SpinnerService } from './service-spinner/spinner-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isChatOpen = false;
  status: string;
  appMinHeight = 0;

  constructor(private spinner: SpinnerService){
    this.spinner.$spinnerAlertSourceEvent.subscribe( (status: string) => {
      this.status = status;
    });
    window.onload = function(val: any){
      this.appMinHeight = val.target.innerHeight;
      console.log('resizing ****', val);
    }.bind(this);
    window.onresize = function(val: any){
      this.appMinHeight = val.target.innerHeight;
      console.log('resizing ****', this.appMinHeight);
    }.bind(this);
  }
  
  checkHieght(){
    console.log('resizing **** checkHieght', this.appMinHeight);
  }
  onChatOpen(isChatOpen){
    this.isChatOpen = isChatOpen;
  }

}
