import { Injectable } from "../../../../node_modules/@angular/core";
import { Subject } from "../../../../node_modules/rxjs";
import { Customer } from "../../data-models/customer.model";

@Injectable()
export class RegisterStepperService{
    stepperEvent = new Subject<{stepNumber: number,data: Customer}>();
    stepperEventSource$ = this.stepperEvent.asObservable();


}