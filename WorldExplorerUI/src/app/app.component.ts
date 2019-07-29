import { Component } from '@angular/core';
import { AuthService } from './modules/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorldExplorerUI';
  

  constructor(private authService: AuthService,
  private router:Router){

  }

  ngOnInit(){
    
  }

  isLoggedIn():boolean{
    if(this.authService.getToken()==null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  logout(){
    this.authService.removeToken();
    this.router.navigate(['login']);
  }
}
