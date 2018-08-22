import { Injectable } from "@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceSpinnerComponent } from "./service-spinner.component";
import { Subject } from "rxjs";

@Injectable()
export class SpinnerService{

    spinnerData: any;
    dialogRef: any;
    spinnerAlertSource = new Subject<string>();
    $spinnerAlertSourceEvent = this.spinnerAlertSource.asObservable();

    constructor(public dialog: MatDialog){
         
    }

    loaderSpinnerData(componentData: any){
        this.spinnerData = componentData;
    }

    showSpinner(): void {
        this.spinnerAlertSource.next('none');
        this.dialogRef = this.dialog.open(ServiceSpinnerComponent, {
            // width: '150px',
            panelClass: 'custom-dialog-container',
            disableClose: true 
            // data: {}
        });

        // setTimeout(() => {
        //     this.hideSpinner()
        // }, 10000);
    }

    hideSpinner(){
        this.spinnerAlertSource.next('');
        this.dialogRef.close('');
    }
}