import { Component, OnInit, Input, ContentChildren, QueryList, AfterViewInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Tab } from './tabs-menu.model';
import { TabPanelComponent } from './tab-panel/tab-panel.component';

@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.component.html',
  styleUrls: ['./tabs-menu.component.css']
})
export class TabsMenuComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() tabs: Tab[];
  @Input() activeTab: number;
  @Output() onTabChange = new EventEmitter<number>();
  @ContentChildren(TabPanelComponent) tabPanels: QueryList<TabPanelComponent>

  constructor() { }

  ngOnInit() {
    console.log('activeTab',this.activeTab)
  }

  ngOnChanges(){
    if(this.tabPanels){
      const tabPanel = this.tabPanels.find(panel => panel.isVisible === true);

      if(tabPanel){
        if(tabPanel.panelId !== this.activeTab){
          this.showTabPanel();
        }
      }
    }
 
  }

  onTabclick(tabId: number): void {
    this.activeTab = tabId;
    this.onTabChange.emit(tabId);
    this.showTabPanel();

  }

  showTabPanel(): void {
    setTimeout(()=>{
      this.tabPanels.forEach(tabPanel => {
        if(tabPanel.panelId === this.activeTab){
          tabPanel.isVisible = true;
        }else{
          tabPanel.isVisible = false;
        }
      })
    },0)

  }

  ngAfterViewInit(): void {
    // this.tabPanels.changes.subscribe(()=>{
     
    //   this.showTabPanel();
    //   console.log(this.tabPanels)
    // });
    this.showTabPanel();
  }


}
