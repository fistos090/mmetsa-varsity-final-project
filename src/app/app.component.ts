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

  constructor(private spinner: SpinnerService){
    this.spinner.$spinnerAlertSourceEvent.subscribe( (status: string) => {
      this.status = status;
    })
  }
  
  onChatOpen(isChatOpen){
    this.isChatOpen = isChatOpen;
  }

}
