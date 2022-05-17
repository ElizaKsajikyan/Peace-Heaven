import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

import {AuthService} from "../services";
import {Observable} from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('customer');
    const session = localStorage.getItem('stytch_session');

    if (user && session) {
      return true;
    }

    this.router.navigateByUrl('/sigin');

    return false;
  }

}
