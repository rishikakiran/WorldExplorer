import { Injectable } from '@angular/core';
import { AuthService } from './modules/authentication/auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private route:Router,
    private authService:AuthService) { }
  
    canActivate(){
      if(!this.authService.isTokenExpired()){
        return true;
      }
      this.route.navigate(['/login']);
      return false;
    }
}
