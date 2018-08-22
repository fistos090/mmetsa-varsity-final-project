import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Customer } from "../../data-models/customer.model";

@Injectable()
export class RegisterStepperService{
    stepperEvent = new Subject<{stepNumber: number,data: Customer}>();
    stepperEventSource$ = this.stepperEvent.asObservable();


}