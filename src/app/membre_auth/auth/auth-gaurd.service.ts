import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})


 /*Le principe: si une route possède une Guard, elle sera interrogée à chaque fois que la route sera demandée.*/
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.isAuthenticated())
      return true;

    this.router.navigate(['login']);
    return false;
  }

}
