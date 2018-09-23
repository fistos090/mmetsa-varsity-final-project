import { Injectable } from "@angular/core";
import { LogonUser } from "../../../data-models/logon-user.model";
import { BehaviorSubject } from "rxjs";
import { OrderAddress } from "src/app/data-models/order-address.model";


@Injectable()
export class UserService{

    private user: LogonUser;
    private redirectData: RedirectData;
    private addressData: OrderAddress;

    logonUserEventSource: BehaviorSubject<LogonUser> = new BehaviorSubject<LogonUser>(this.user);
    logonUserEventSource$ = this.logonUserEventSource.asObservable();

    setLogonUser(user: LogonUser): void {
        this.user = user;
        this.logonUserEventSource.next(user);
    }

    getLogonUser(): LogonUser {
        return this.user;
    }

    setRedirectData(redirectData: RedirectData): void {
        this.redirectData = redirectData;
    }

    getRedirectData(): RedirectData{
        return this.redirectData;
    }

    setAddress(address: OrderAddress): void {
        this.addressData = address;
    }

    getAddress(): OrderAddress {
        return this.addressData;
    }
}

export interface RedirectData{
    toUrl: string;
    fromUrl: string;
    
}