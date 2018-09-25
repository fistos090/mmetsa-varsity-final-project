import { Injectable } from "@angular/core";
import { LogonUser } from "../../../data-models/logon-user.model";
import { BehaviorSubject } from "rxjs";
import { OrderAddress } from "src/app/data-models/order-address.model";
import { ShoppingBusketComponent } from "src/app/shopping-basket/shopping-basket.component";


@Injectable()
export class UserService {

    private user: LogonUser;
    private redirectData: RedirectData;
    private addressData: OrderAddress;
    private userBasketState: ShoppingBusketComponent;

    logonUserEventSource: BehaviorSubject<LogonUser> = new BehaviorSubject<LogonUser>(this.user);
    logonUserEventSource$ = this.logonUserEventSource.asObservable();
    isPaypalScriptLoad = false;

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

    getRedirectData(): RedirectData {
        return this.redirectData;
    }

    setAddress(address: OrderAddress): void {
        this.addressData = address;
    }

    getAddress(): OrderAddress {
        return this.addressData;
    }

    setBasketState(state: any): void {
        this.setBasketState = state;
    }

    restoreBasketState(): any {
        return this.setBasketState;
    }
}

export interface RedirectData {
    toUrl: string;
    fromUrl: string;

}