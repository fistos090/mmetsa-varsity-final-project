import { Injectable } from "../../../node_modules/@angular/core";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceSpinnerComponent } from "./service-spinner.component";

@Injectable()
export class SpinnerService{

    spinnerData: any;
    dialogRef: any;

    constructor(public dialog: MatDialog){
         
    }

    loaderSpinnerData(componentData: any){
        this.spinnerData = componentData;
    }

    showSpinner(): void {
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
        this.dialogRef.close('');
    }
}