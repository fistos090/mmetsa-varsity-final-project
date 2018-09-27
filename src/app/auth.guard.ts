import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user-account/register/user-details/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.userService.setRedirectData({fromUrl: '', toUrl: state.url});
    return this.checkAuth();
  }

  checkAuth(): boolean{

    if (this.userService.getLogonUser() !== undefined) {
      return true;
    }

    this.router.navigate(['user-account/1']);
    return false;
  }
}
