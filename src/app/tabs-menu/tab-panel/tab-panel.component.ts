import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.css']
})
export class TabPanelComponent implements OnInit {

  @Input() isVisible = false;
  @Input() panelId: number;

  constructor() { }

  ngOnInit() {
  }

}
