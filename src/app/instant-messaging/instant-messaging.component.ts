import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-instant-messaging',
  templateUrl: './instant-messaging.component.html',
  styleUrls: ['./instant-messaging.component.css']
})
export class InstantMessagingComponent implements OnInit {

  @Input() isAdminOnline = true;
  @Output() chatOpenEvent = new EventEmitter<boolean>();

  isChatOpen = false;
  message = 'Chat with us'
  constructor() { }
  
  ngOnInit() {
  }

  openChat(){
  
    if(this.isAdminOnline){
      
      this.isChatOpen = !this.isChatOpen;
      this.chatOpenEvent.emit(this.isChatOpen);
    }else{
      this.message = 'Our administrator are not available for live chat now. Please try again later.';
      this.isChatOpen = false;
      this.chatOpenEvent.emit(this.isChatOpen);
    }

    if(this.isChatOpen){
      this.message = 'Polos'
    }else
    if(!this.isChatOpen && this.isAdminOnline){
      this. message = 'Chat with us'
    }
  }


}
