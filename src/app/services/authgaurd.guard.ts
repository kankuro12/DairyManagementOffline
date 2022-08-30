import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthenticated = this.auth.getAuthStatus();
      if (!isAuthenticated) {
          this.router.navigate(['/login']);
      }
      return isAuthenticated;
  }

}
