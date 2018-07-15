export class Tab{
    tabTitle:string;
    tabId:string;

    constructor(tabData:any){
        this.tabId = tabData.tabId;
        this.tabTitle = tabData.tabTitle;
    }
}