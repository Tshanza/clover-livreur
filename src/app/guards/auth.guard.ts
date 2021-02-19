import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router,
              private authService: AuthService){}

  async canLoad(): Promise<boolean> {

    const isAuth = this.authService.isAuth;

    if(!isAuth){
      this.router.navigateByUrl('/sign-in');
      this.authService.checkAuthStatus();
      return true;

    }

    return true;

  }

}
