import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';

const { Storage } = Plugins;
export const AUTH_KEY = 'isAuthenticate';

@Injectable({
  providedIn: 'root'
})
export class AutoSignGuard implements CanLoad {

  constructor(private router: Router,
              private authService: AuthService){}

  async canLoad(): Promise<boolean > {

    const isAuth = await Storage.get({key: AUTH_KEY});

    if(isAuth && (isAuth.value === 'true')){
      this.authService.isAuth = true;
      this.router.navigateByUrl('/tab', { replaceUrl: true});
      this.authService.checkAuthStatus();

    }

    
    return true;
  }

}
