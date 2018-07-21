import { Injectable } from "../../../../node_modules/@angular/core";
import { LogonUser } from "../../data-models/logon-user.model";
import { BehaviorSubject } from "../../../../node_modules/rxjs";

@Injectable()
export class UserService{

    private user: LogonUser;

    logonUserEventSource: BehaviorSubject<LogonUser> = new BehaviorSubject<LogonUser>(this.user);
    logonUserEventSource$ = this.logonUserEventSource.asObservable();

    setLogonUser(user: LogonUser): void {
        this.user = user;
        this.logonUserEventSource.next(user);
    }

    getLogonUser(): LogonUser {
        return this.user;
    }


}