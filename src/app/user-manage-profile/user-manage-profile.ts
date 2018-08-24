import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'user-manage-profile',
    templateUrl: './user-manage-profile.html',
    styleUrls: ['./user-manage-profile.css']
})
export class UserManageProfileComponent implements OnInit {

    activeId = 0;
    constructor(){

    }

    ngOnInit(): void {
        this.activeId = 1;
    }

    changeView(viewId: number){
        this.activeId = viewId;
    }

}